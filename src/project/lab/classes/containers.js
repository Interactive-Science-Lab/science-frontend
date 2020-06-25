
import React from 'react'
import { ItemInstance } from './core'
import { Mixture } from './mixture'
import masterListHelper from './masterList'

export class ContainerInstance extends ItemInstance {
    constructor(record, instance, hoverPos, instance_id) {
        super(record, instance, hoverPos, instance_id);
        this.contents = new Mixture();
    }
    
    /* ------------------------ */
    /*      CONTENT HELPERS     */
    /* ------------------------ */
    //Takes in an ObjectItemInstance or a SubstanceItemInstance
    addToContents = (itemInstance, component = null) => {
        if (this.record.hold_volume > itemInstance.getVolume() + this.getFillVolume()) {
            itemInstance.area = null
            itemInstance.pos = null
            this.flash(2)
            this.contents = this.contents.addItemToMixture(itemInstance, component)
        }
        return this
    }
    //"Empties" the contents, creating a a clean container.
    emptyContents = (component) => { this.contents.reset(component) }
    //Takes in a volume amount and the main component, 
    splitContents = (volume, component) => { return this.contents.split(volume, component) }
    //Returns an ingredient by a given name if it exists in the contents.
    findIngredient = (name) => { return this.contents.findIngredient(name) }
    //Prints them out HTML
    displayContents = () => { return this.contents.displayContents().map(i => <div>{i.name}</div>) }
    //Returns the generic number for how many different ingredients in container.
    contentCount = () => { return this.contents.ingredients.length }
    

    
    /* ------------------------ */
    /*      STATS & INFOS       */
    /* ------------------------ */
    getSprite = () => {
        if (this.contentCount() > 0 && this.contents.color) {
            return `${this.record.sprite}-${this.contents.texture}-${this.contents.color}-${this.calculateFillPercent()}.png`
        } else {
            return this.record.sprite + ".png"
        }
    }
    //Returns how filled the container is
    getFillVolume = () => { return this.contents.getVolume() }
    //Returns a rounded fill percentage to the nearest 10.
    calculateFillPercent = () => { return Math.floor(this.getFillVolume() / this.record.hold_volume * 10) * 10 }
    //Returns the Ph of the mixture
    getPh = () => { return this.contents.getPh() }
    //Returns the temp of the mixture
    getTemperature = () => { return this.contents.getTemperature() }
    //Returns the total mass, container + mixture
    getMass = () => { return this.record.mass + this.contents.getMass() }
    advanceTime = (seconds, component) => {
        this.ingredient.time += seconds

        let seltzerInstance = this.findIngredient("Seltzer Tablet")
        if (seltzerInstance) { this.handleSeltzer(seltzerInstance) }

        let saltInstance = this.findIngredient('Salt')
        let waterInstance = this.findIngredient('Water')
        if(saltInstance && waterInstance) { this.handleSalt(saltInstance, component) } 

        this.contents.advanceTime(seconds, component)
    }
    heatItem = (temperature, component) => {
        this.ingredient.temperature += temperature
        this.contents.adjustTemperature(temperature, component)
    }
    setTemperature = (temperature, component) => {
        this.ingredient.temperature = temperature
        this.contents.adjustTemperatureTo(temperature, component)
    }

    /* ------------------------ */
    /* SPECIFIC FUNCTIONALITIES */
    /* ------------------------ */
    fillWithWater = (e, component) => {
        let temperature = e.target.classList.contains('waterHot') ? 50 : 10
        let waterRecord = masterListHelper.getRecordByNameAndType(component.state.masterItemList, "Water", 'substances')
        waterRecord.temperature = temperature
        waterRecord.volume = 10
        let waterInstance = component.state.itemsState.newInstance(waterRecord, { itemType: 'substances' }, {})
        this.addToContents(waterInstance, component)
        this.flash()
        component.state.itemsState.updateInstanceAndState(this, component)
    }

    handleSeltzer = (seltzerInstance) => {
        let record = seltzerInstance.record
        let massList = {}
        try {
            massList = JSON.parse(record.properties[1])
        } catch { console.log("ERROR WITH JSON PARSE") }

        delete massList.name
        let waterTemp = 0
        Object.keys(massList).map(tempRange => {
            if (tempRange <= this.getTemperature() && (tempRange + 10 >= this.getTemperature() || tempRange  === 42)) {
                waterTemp = tempRange
            }
            return tempRange
        })
        
        let tempList = massList[waterTemp]
        let newMass = 0
        Object.keys(tempList).map(tempEntry => {
            tempEntry = Number.parseInt(tempEntry)
            if (tempEntry <= this.getTime() && (tempEntry + 5 > this.getTime() || (tempEntry  === 60 && this.getTime() < 120) || (tempEntry  === 120 && this.getTime() > 120))) {
                newMass = tempList[tempEntry]
            }
            return tempEntry
        })

        newMass = newMass || seltzerInstance.getMass()

        this.contents.adjustMass(newMass - seltzerInstance.getMass())
        seltzerInstance.setMass(newMass)
    }

    handleSalt = (saltInstance, component) => {
        let record = saltInstance.record
        let massList = {}
        try {
            massList = JSON.parse(record.properties[1])
        } catch { console.log("ERROR WITH JSON PARSE") }

        console.log(massList)

        let saltMass = saltInstance.getMass()
        if(saltMass > 50) { saltMass = 50 }

        let tempRanges = {}
        Object.keys(massList).map(amount => {
            amount = Number.parseInt(amount)
            if(saltMass > (amount - 5.75) && saltMass < (amount + 5.75) ) {
                tempRanges = amount
            }
            return amount
        })

        let time = Math.floor(saltInstance.getTime() / 60) * 60
        if(time > 300) (time = 300)

        let tempChange = massList[ `${tempRanges}` ][ `${time}` ]

        this.contents.adjustTemperature(tempChange, component)
    }

}



