
import React from 'react'
import { Mixture } from './mixture'
import { ItemInstance } from './core'

export class ToolInstance extends ItemInstance {
    constructor(record, instance, hoverPos, instance_id) {
        super(record, instance, hoverPos, instance_id)
        this.usedItem = {}
        this.contents = new Mixture()
        this.option = {}
    }

    setTare = (e, component) => {
        let tare = 0
        if(this.usedItem?.instance_id){
            tare = this.usedItem.getMass();
        }
        this.option.tare = tare
        this.flash(1.5)
        this.update(component)
    }

    getSprite = () => {
        //If it's a scoop tool, and there is a "usedItem"
        if (this.record.properties.indexOf('scoop') > -1 && this.usedItem?.itemType === 'substances') {
            return `${this.record.sprite}-${this.usedItem.record.texture}-${this.usedItem.record.color}.png`
        } else {
            return this.record.sprite + '.png'
        }
        
    }

    //Takes an ObjectItemInstance or ContainerInstance
    addItem = (itemInstance, component) => {
        if (this.usedItem?.itemType === 'substances' && itemInstance.isType('containers')) {
            itemInstance.addToContents(this.clearItem(), component)
            this.flash(2)
        } else if (!this.usedItem?.itemType) {
            this.usedItem = itemInstance
            if(this.name==='Dissection Tray' && ['Frog', "Worm"].indexOf(itemInstance.name) > -1) {
                this.record.sprite += `-${itemInstance.sprite}-1`
            }
            itemInstance.removePosition()
            this.flash(2)
        }
        return this
    }

    clearItem = () => {
        const oldItem = this.usedItem
        this.usedItem = {}
        return oldItem
    }

    getItemMass = () => {
        let mass = 0
        if (this.usedItem.instance_id) { mass = this.usedItem.getMass() }
        return mass - Number.parseInt(this.option.tare || 0) 
    }
    getItemTemperature = () => {
        if (this.usedItem.instance_id) { return this.usedItem.getTemperature() } 
        else { return "None" }
    }
    getItemPh = () => {
        if (this.usedItem.instance_id) { return this.usedItem.getPh() } 
        else { return 7 }
    }
    getItemTime = () => {
        if (this.usedItem.instance_id) { return this.usedItem.getTime() } 
        else { return 0 }
    }

    //Removes all the solid items
    strainSolidItems = (e, component) => {

        if (this.usedItem?.itemType === 'containers') {
            let itemContents = this.usedItem.contents.ingredients
            let solidContents = new Mixture()
            let liquidContents = new Mixture()
            itemContents.map(i => {
                if (i.getTemperature() > i.record.low_temp_point) { liquidContents.addItemToMixture(i) }
                else { solidContents.addItemToMixture(i) }
                return i
            })

            this.contents.combineMixture(solidContents)
            this.usedItem.contents = liquidContents

            
        this.flash(1.5)
            this.update(component)

        } else {
            //component.setState({ message: "You can only strain containers." })
        }
    }
    //Takes the Mixture in this.contents and combines it with the mixture in UsedItem
    combineStrainItems = (e, component) => {
        if (this.usedItem?.itemType === 'containers') {
            let contents = this.contents
            this.contents = new Mixture()
            this.usedItem.contents.combineMixture(contents, component)
            this.flash(1.5)
            this.update(component)
        } else {
            //component.setState({ message: "You can only combine into a container." })
        }
    }

    heatItem = (event, component) => {
        const cList = event.target.classList
        const heat = (cList.contains('heat-hi') ? 50 : (
            cList.contains('heat-mid') ? 25 : (
                5
            )
        ))

        let useable = cList.contains('heatsource-useable')
        if( useable >= 0 ) {
            let mass = this.option.mass || 46
            if(mass > heat / 10) {
                mass -= (heat / 10)
                this.option.mass = mass
            }
        }

        if(this.usedItem?.itemType) {
            this.usedItem.heatItem(heat, component)
            this.flash(1.5)
            this.update(component)
        }
    }

    getHeatSourceMass = () => {
        return this.option.mass || 46
    }

    timeItem = (event, component) => {
        const cList = event.target.classList
        const time = (cList.contains('time-hi') ? 600 : (
            cList.contains('time-mid') ? 60 : (
                5
            )
        ))

        if (this.usedItem.itemType) {
            this.usedItem.advanceTime(time, component)
            if(time === 600) {
                this.usedItem.setTemperature(20, component)
            }
            this.flash(1.5)
            this.update(component)
        }
    }

    displayContents = () => { return this.contents.displayContents().map(i => <div>{i.name}</div>) }
    contentCount = () => { return this.contents.ingredients.length }

    addSubstanceToScoopTool = (substanceInstance, component) => {
        let scoopCheck = this.record.properties.indexOf('scoop')
        if (scoopCheck > -1) {
            if (this.usedItem?.name) {
                //component.setState({ message: "There is already something in the scoop." })
            } else {
                let scoopSettings = this.record.properties[scoopCheck + 1].split('-')
                let volume = Number.parseInt(scoopSettings[2])

                let scoopInstance = component.state.itemsState.duplicate(substanceInstance)

                scoopInstance.setVolume(volume)
                scoopInstance.setMass(volume * scoopInstance.record.density)

                this.flash(1.5)
                this.addItem(scoopInstance)
            }
        } else {
            //component.setState({ message: "You need a tool that can scoop to do that." })
        }

        return this
    }

    splitMixture = (e, component) => {
        if(this.usedItem.itemType === 'containers') {
            this.contents = this.usedItem.splitContents(10, component)
            this.update(component)
            this.flash(1.5)
        }
    }

    update = (component) => {
        component.state.itemsState.updateInstance(this)
        if(this.usedItem?.instance_id){component.state.itemsState.updateInstance(this.usedItem)}
        component.state.itemsState.updateState(component)
    }

    checkDissection = (other, component) => {
        console.log(this, other)
        if(this.name === 'Dissection Tray') {
            if(this.usedItem.name) {
                console.log(this.usedItem)
                let dissectPos = this.usedItem.record.properties.indexOf('disect')
                if(dissectPos > -1) {
                    let dissectInfo = this.usedItem.record.properties[dissectPos+1].split('-')
                    let spriteInfo = this.record.sprite.split('-')
                    let stage = parseInt(spriteInfo[2]) - 1
                    if(dissectInfo[stage] === other.name.toLowerCase() ) {
                        spriteInfo[2] = stage + 2
                        this.record.sprite = spriteInfo.join('-')
                        this.flash(2)
                    }
                }
            }
        }
    }

}
