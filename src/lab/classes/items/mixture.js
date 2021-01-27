
import masterListHelper from './masterList'

//The class for controlling combinations of substances & objects
export class Mixture {
    constructor(ingredientArray = []) {
        this.ingredients = []
        this.temperature = null
        this.ph = null
        this.mass = 0
        this.volume = 0
        this.density = 0
        this.color = null
        this.texture = null
        this.time = 0

        //use the incoming ingredient array to fulfill the stats
        ingredientArray.map(i => this.addItemToMixture(i) )
    }

    getMass = () => {
        return this.mass
    }
    getVolume = () => {
        return this.volume
    }
    getTemperature = () => {
        return this.temperature
    }
    getPh = () => {
        return this.ph
    }
    getTime = () => {
        return this.time
    }


    addItemToMixture = (itemInstance, component = null) => {
        itemInstance.removePosition()
        let mass = itemInstance.getMass()
        let volume = itemInstance.getVolume()
        let temperature = itemInstance.getTemperature()
        let ph = itemInstance.getPh()

        let currentMass = this.mass
        let currentTemperature = this.temperature
        let currentPh = this.ph

        let ratio = mass / (currentMass + mass)
        let newTemperature = (ratio * temperature) + ((1 - ratio) * currentTemperature)
        let newPh = (ratio * ph) + ((1 - ratio) * currentPh)

        this.mass += mass
        this.volume += volume
        this.temperature = newTemperature
        this.ph = newPh

        if(itemInstance.itemType === 'substances') {
            this.combineInstance(itemInstance, component)
        } else {
            this.ingredients.push(itemInstance)
        }

        if(itemInstance.name === "Water") {
            this.color = 'lightblue'
            this.texture = 'liquid'
        }
        if(!this.color && itemInstance.name === 'Salt') {
            this.color = 'white'
            this.texture = 'granule'
        }

        let ingredientProperty = itemInstance.record.properties.indexOf('precipitate-ingredient')
        if( ingredientProperty >= 0) {
            let otherIngredientName = itemInstance.record.properties[ingredientProperty + 1]
            let precipitateName = itemInstance.record.properties[ingredientProperty + 2]

            let otherIngredientInstance = this.findIngredient(otherIngredientName)
            if(otherIngredientInstance) {
                let firstMass = itemInstance.getMass()
                let secondMass = otherIngredientInstance.getMass()
                let smallIng = firstMass < secondMass ? itemInstance : otherIngredientInstance
                let bigIng = firstMass < secondMass ? otherIngredientInstance : itemInstance

                this.removeItemFromMixture(smallIng)
                this.removeItemFromMixture(bigIng)
                if(firstMass !== secondMass) {
                    bigIng.setMass( bigIng.getMass() - smallIng.getMass() )
                    this.addItemToMixture(bigIng)
                }

                let reactionMass = smallIng.getMass()
                let precipitateRecord = masterListHelper.getRecordByNameAndType(component.state.masterItemList, precipitateName, 'substances')
                precipitateRecord.volume = reactionMass
                let precipitateInstance = component.state.itemsState.newInstance(precipitateRecord, { itemType: 'substances' }, {})
                this.addItemToMixture(precipitateInstance, component)
            }

        }

        return this
    }

    combineInstance = (incomingInstance, component = null) => {
        let oldInstance = {}
        this.ingredients.filter(i => i.name === incomingInstance.name ? oldInstance = i : null) 
        if(oldInstance.name) {
            oldInstance.combine(incomingInstance)
            if (component) {
                component.state.itemsState.removeItem(incomingInstance.instance_id)
                component.state.itemsState.updateState(component)
            }
        } else {
            this.ingredients.push(incomingInstance)
        }
    }

    removeItemFromMixture = (itemInstance) => {
        this.ingredients = this.ingredients.filter(i => i.instance_id !== itemInstance.instance_id)
        this.mass -= itemInstance.getMass()
        this.volume -= itemInstance.getVolume()
        if(itemInstance.name === "Water") {
            this.color = null
            this.texture = null
        }
        if(!this.color && itemInstance.name === 'Salt') {
            this.color = null
            this.texture = null
        }
        return itemInstance
    }

    combineMixture(fromMixture, component = null) {
        fromMixture.ingredients.map(i => this.addItemToMixture(i, component))
    }

    findIngredient = (name) => {
        let ret = null
        this.ingredients.map(i => i.name === name ? ret = i : null) 
        return ret
    }

    advanceTime = (seconds, component) => {
        this.time += seconds
        this.ingredients.map(ingredient => {
            ingredient.advanceTime(seconds)
            component.state.itemsState.updateInstance(ingredient)
            return ingredient
        })
        component.state.itemsState.updateState(component)
    }
    
    adjustMass = (difference) => {
        this.mass += difference
    }

    adjustTemperature = (difference, component) => {
        this.temperature += difference
        this.ingredients.map(ingredient => {
            ingredient.setTemperature(this.temperature, this)
            component.state.itemsState.updateInstance(ingredient)
            return ingredient
        })
        component.state.itemsState.updateState(component)
    }

    adjustTemperatureTo = (temp, component) => {
        this.temperature = temp
        this.ingredients.map(ingredient => {
            ingredient.setTemperature(this.temperature, this)
            component.state.itemsState.updateInstance(ingredient)
            return ingredient
        })
        component.state.itemsState.updateState(component)
    }

    split = (volume, component) => {
        //calculate percentages, and create a similar copy of things.
        let percentSplit = 1.0 * volume / this.volume

        let totalItems = this.ingredients.map(i => this.removeItemFromMixture(i))
        let newMixture = new Mixture()

        totalItems.map(i => {
            if(i.isType('substances')){
                let second = i.split(percentSplit, component)
                newMixture.addItemToMixture(second)
            }
            this.addItemToMixture(i)
            return i
        })

        return newMixture
        
    }

    displayContents = () => {
        return this.ingredients
    }

    removeSolids = () => {
        let itemContents = this.ingredients
        //Create a new mixture to add them into if the object is solid
        let solidMixture = new Mixture()
        itemContents.map(i => {
            if (i.stateOfMatter === 'solid') { 
                solidMixture.addItemToMixture(i) 
                this.removeItemFromMixture(i)
            }
            return i
        })
        return solidMixture
    }


    reset = (component) => {
        this.ingredients.map( i => component.state.itemsState.removeItem( this.removeItemFromMixture(i).instance_id ) )
        this.temperature = null
        this.ph = null
        this.mass = 0
        this.volume = 0
        this.density = 0
        this.color = null
        this.texture = null
        this.time = 0
    }

}
