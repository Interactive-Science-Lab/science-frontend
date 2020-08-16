import { Ingredient } from './ingredient'


//The class for moving around the screen.
export class ItemInstance {
    constructor(record, instance, hoverPos, instance_id) {
        this.pos = hoverPos.pos
        this.area = hoverPos.area
        this.sprite = record.sprite
        this.instance_id = instance_id
        //containers, objects, tools, substances
        this.itemType = instance.itemType
        //short hand to the record, has default infos & properties
        this.name = record.display_name
        this.record = JSON.parse(JSON.stringify(record))
        //Ingredients hold all the infos regarding temp, mass, ph, time, etc.
        this.ingredient = new Ingredient(record, this)

        console.log(this.record)

        const randomize = this.record.properties.indexOf('random')
        if(randomize > -1) {
            let outOf = Number.parseInt(this.record.properties[randomize + 1])
            let value = Math.ceil(Math.random() * outOf)
            this.record.color = value
        }
    }

    /* ----------------------------------- */
    /*      GENERAL HELPERS - GET & SET    */
    /* ----------------------------------- */
    //Takes in either an array of types or a single type, and returns true if it is of that type.
    isType = (itemType) => {
        if (Array.isArray(itemType)) {
            return (this.instance_id >= 0 && itemType.includes(this.itemType))
        } else {
            return (this.itemType === itemType && this.instance_id >= 0)
        }
    }

    getSprite = () => { return `${this.record.sprite}-${this.record.color}.png` }
    getMass = () => { return this.ingredient.mass }
    getVolume = () => { return this.ingredient.volume }
    getPh = () => { return this.ingredient.ph }
    getTemperature = () => { return this.ingredient.temperature }
    getTime = () => { return this.ingredient.time }
    
    setVolume = (volume) => { this.ingredient.volume = volume }
    setMass = (mass) => { this.ingredient.mass = mass }
    setPh = (ph) => { this.ingredient.ph = ph }
    setTemperature = (temperature) => { this.ingredient.temperature = temperature }

    //Just some helpers that increase by the amount, instead of TO the amount
    increaseVolume = (volume) => { this.setVolume(volume + this.getVolume()) }
    increaseMass = (mass) => { this.setMass(mass + this.getMass()) }
    advanceTime = (seconds) => { this.ingredient.time += seconds }
    heatItem = (temperature, component) => { this.ingredient.temperature += temperature }

    flash = (intensity = 1) => {
        let item = this.getHtmlElement()
        item.style.backgroundColor = `rgba(255,255,255,.${4*intensity})`
        setTimeout(function(){ item.style.backgroundColor = 'transparent'; }, 200*intensity);
    }

    getHtmlElement = () => {
        return document.getElementsByClassName(`instance-${this.instance_id}`)[0]
    }

    advanceGraphic = (e, component) => {
        let currentColor = Number.parseInt(this.record.color)
        let progressInt = this.record.properties.indexOf("progress")
        let maxLoop = Number.parseInt(this.record.properties[progressInt + 1])
        if(maxLoop === currentColor) {currentColor = 0}
        this.record.color = currentColor + 1
        component.state.itemsState.updateInstanceAndState(this, component)
    }

    revealItem = (e, component) => {
        let randomPos = this.record.properties.indexOf("reveal-random")
        let outOf = Number.parseInt(this.record.properties[randomPos + 1])
        let value = Math.ceil(Math.random() * outOf)
        this.record.color = value
        this.record.properties[randomPos] = ""
        component.state.itemsState.updateInstanceAndState(this, component)
    }

    checkSynthesis = (other, component) => {
        let proteinCheck = this.record.properties.indexOf('protein-connect')
        let otherCheck = other.record.properties.indexOf('protein-connect')
        if(proteinCheck > -1 && otherCheck > -1) {
            if(this.record.properties[proteinCheck+1] === other.name){
                let dna = {}
                let rna = {}
                if(this.name.indexOf('DNA') > -1){
                    dna = this
                    rna = other
                } else {
                    dna = other
                    rna = this
                }
                dna.record.color = '1'
                component.state.itemsState.removeItem(rna.instance_id)
            }
        }
    }


    runAtpCalculation = (e, component) => {
        let item = e.target.closest('.drag-item')
        let molecules = item.querySelector('.atp-molecules').value 
        let aerobic = item.querySelector('.atp-aerobic').value
        aerobic = aerobic === "Aerobic" ? 32 : 2
        let result = aerobic * parseInt(molecules)
        item.querySelector('.atp-reading').innerHTML = `Yielded ${result} ATP`
    }

    openPhysicsWindow = (e, component) => {
        console.log(e, component)
        let instance_id = e.target.getAttribute('data-instance')
        let targetHTML = document.getElementById(`experiment-window-${instance_id}`)
        targetHTML.style.display = "block"
    }
    
    /* ------------------------  */
    /*      POSITION HELPERS     */
    /* ------------------------  */
    clearPosition = () => {
        this.pos = null
        this.area = null
    }
    removePosition = () => { this.clearPosition(); }

    updatePosition = ({ pos, area }) => {
        this.pos = pos
        this.area = area
    }

}

