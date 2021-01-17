
import {ItemInstance} from './core'

export class SubstanceInstance extends ItemInstance {
    constructor(record, instance, hoverPos, instance_id) {
        super(record, instance, hoverPos, instance_id);
        this.ingredient.mass = this.record.density * this.ingredient.volume
        this.option = {}
    }
  
    getSprite = () => { 
        return `${this.record.texture}-${this.record.color}-${this.record.container}.png`
    }



    setTemperature = (temperature, mixtureComponent = null) => {
        let burning = this.record.properties.indexOf('burnaway')
        if(burning >= 0) {
            let burnSettings = this.record.properties[burning+1].split('-')
            let burnPercent = Number.parseFloat('.' + burnSettings[1])
            let burnTemp = Number.parseInt(burnSettings[2])
            if(temperature > burnTemp && !this.option.burned) {
                let newMass = burnPercent * this.ingredient.mass
                this.option.burned = true
                if(mixtureComponent) {
                    mixtureComponent.mass -= (this.ingredient.mass - newMass)
                }
                this.ingredient.mass = newMass
            }
        }
        this.ingredient.temperature = temperature 
    }

    createScoopInstance = (volume) => {
        const newScoop = JSON.parse(JSON.stringify(this))
        newScoop.clearPosition()
        return newScoop
    }

    combine = (otherSubstance) => {
        this.increaseMass(otherSubstance.getMass())
        this.increaseVolume(otherSubstance.getVolume())
    }

    //creates a new substance item, sets accordingly
    split = (splitPercent, component) => {
        let newSubstance = component.state.itemsState.duplicate(this)
        
        let remainPercent = 1.0 - splitPercent

        let totalMass = this.getMass()
        let totalVolume = this.getVolume()

        this.setMass(totalMass * remainPercent)
        this.setVolume(totalVolume * remainPercent)

        newSubstance.setMass(totalMass * splitPercent)
        newSubstance.setVolume(totalVolume * splitPercent)
        newSubstance.setTemperature(this.getTemperature())
        newSubstance.setPh(this.getPh())


        component.state.itemsState.updateInstance(this)
        component.state.itemsState.updateInstance(newSubstance)
        component.state.itemsState.updateState(component)


        return newSubstance

    }

}