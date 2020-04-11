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
        this.record = record
        //Ingredients hold all the infos regarding temp, mass, ph, time, etc.
        this.ingredient = new Ingredient(record, this)
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

