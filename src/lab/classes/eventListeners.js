import DragHelper from './drag'

class EventListenerHelper {
    constructor(coreComponent, soundPlayer) {
        this.coreComponent = coreComponent
        this.soundPlayer = soundPlayer
    }

    dragListeners = () => {
        const dragItems = document.querySelectorAll('.drag-item')
        for (const item of dragItems) {
            item.addEventListener('dragstart', this.dragStart)
            item.addEventListener('dragend', this.dragEnd)
        }

        const inventoryItems = document.querySelectorAll('.inventory-item')
        for (const item of inventoryItems) {
            item.addEventListener('dragstart', this.dragInventoryStart)
            item.addEventListener('dragend', this.dragInventoryEnd)
        }
        
        const dropzones = document.querySelectorAll('.dropzone')
        for (const dropzone of dropzones) {
            dropzone.addEventListener('dragover', this.dragOver)
            dropzone.addEventListener('dragenter', this.dragEnter)
        }
        
        const waterButtons = document.querySelectorAll('.waterButton')
        for (const waterButton of waterButtons) { waterButton.addEventListener('click', this.fillWater) }

        
        const emptyButtons = document.querySelectorAll('.empty-item')
        const removeButtons = document.querySelectorAll('.remove-item')
        for (const removeButton of removeButtons) { removeButton.addEventListener('click', this.removeItem) }
        for (const emptyButton of emptyButtons) { emptyButton.addEventListener('click', this.emptyItem) }



        /* Chemistry Buttons */
        const strainButtons = document.querySelectorAll('.strain-item')
        const combineStrainButtons = document.querySelectorAll('.combine-strain-item')
        const heatButtons = document.querySelectorAll('.heat-item')
        const timeButtons = document.querySelectorAll('.time-item')
        const tareButtons = document.querySelectorAll('.tare-item')
        const splitButtons = document.querySelectorAll('.split-item')

        for (const strainButton of strainButtons) { strainButton.addEventListener('click', this.strainItem) }
        for (const combineStrainButton of combineStrainButtons) { combineStrainButton.addEventListener('click', this.combineStrainItem) }
        for (const heatButton of heatButtons) { heatButton.addEventListener('click', this.heatItem) }
        for (const timeButton of timeButtons) { timeButton.addEventListener('click', this.timeItem) }
        for (const tareButton of tareButtons) { tareButton.addEventListener('click', this.tareItem) }
        for (const splitButton of splitButtons) { splitButton.addEventListener('click', this.splitItem) }

        /* Bio Buttons */
        const revealButtons = document.querySelectorAll('.reveal-item')
        const advanceButtons = document.querySelectorAll('.advance-graphic')
        const atpButtons = document.querySelectorAll('.run-atp-item')

        for (const revealButton of revealButtons) { revealButton.addEventListener('click', this.revealItem) }
        for (const advanceButton of advanceButtons) { advanceButton.addEventListener('click', this.advanceGraphic) }
        for (const atpButton of atpButtons) { atpButton.addEventListener('click', this.runAtpCalculation) }

        /* Physics Buttons */
        const physics = document.querySelectorAll('.run-physics')
        for (const physic of physics) { physic.addEventListener('click', this.openPhysicsWindow) }

        const closeButtons = document.querySelectorAll('.close-sound-effect')
        for (const closeButton of closeButtons) { closeButton.addEventListener('click', this.closeButtonEffect) }
    }

    emptyItem = (e) => {
        //Get the instance off of the event
        const instance = this.coreComponent.state.itemsState.getInstanceByEvent(e)
        //Empty the container
        instance.emptyContents(this.coreComponent)
        this.soundPlayer.playEffect('remove');
        //Update the item in state
        this.coreComponent.state.itemsState.updateInstanceAndState(instance, this.coreComponent)
    }

    removeItem = (e) => {
        this.soundPlayer.playEffect('remove');
        this.coreComponent.state.itemsState.removeItemByEvent(e, this.coreComponent)
    }
    fillWater = (e) => {
        let w = this.coreComponent.state.itemsState.getInstanceByEvent(e)
        if (w.instance_id) {
            this.soundPlayer.playEffect('drop');
            w.fillWithWater(e, this.coreComponent)
        } else {
            this.soundPlayer.playEffect('error');
        }
    }
    strainItem = (e) => {
        this.soundPlayer.playEffect('click');
        this.coreComponent.state.itemsState.getInstanceByEvent(e).strainSolidItems(e, this.coreComponent)
    }
    combineStrainItem = (e) => {
        this.soundPlayer.playEffect('click');
        this.coreComponent.state.itemsState.getInstanceByEvent(e).combineStrainItems(e, this.coreComponent)
    }
    heatItem = (e) => {
        this.soundPlayer.playEffect('click');
        this.coreComponent.state.itemsState.getInstanceByEvent(e).heatItem(e, this.coreComponent)
    }
    timeItem = (e) => {
        this.soundPlayer.playEffect('click');
        this.coreComponent.state.itemsState.getInstanceByEvent(e).timeItem(e, this.coreComponent)
    }
    tareItem = (e) => {
        this.soundPlayer.playEffect('click');
        this.coreComponent.state.itemsState.getInstanceByEvent(e).setTare(e, this.coreComponent)
    }
    splitItem = (e) => {
        this.soundPlayer.playEffect('click');
        this.coreComponent.state.itemsState.getInstanceByEvent(e).splitMixture(e, this.coreComponent)
    }
    revealItem = (e) => {
        this.soundPlayer.playEffect('click');
        this.coreComponent.state.itemsState.getInstanceByEvent(e).revealItem(e, this.coreComponent)
    }
    advanceGraphic = (e) => {
        this.soundPlayer.playEffect('click');
        this.coreComponent.state.itemsState.getInstanceByEvent(e).advanceGraphic(e, this.coreComponent)
    }
    runAtpCalculation = (e) => {
        this.soundPlayer.playEffect('click');
        this.coreComponent.state.itemsState.getInstanceByEvent(e).runAtpCalculation(e, this.coreComponent)
    }

    openPhysicsWindow = (e) => {
        this.soundPlayer.playEffect('click');
    }
    closeButtonEffect = (e) => {
        this.soundPlayer.playEffect('remove');
    }

    dragInventoryStart = (e) => {
        this.soundPlayer.playEffect('drag');
        DragHelper.dragInventoryStart(this.coreComponent, e)
    }
    dragInventoryEnd = (e) => {
        this.soundPlayer.playEffect('drop');
        DragHelper.dragInventoryEnd(this.coreComponent, e)
    }
    dragStart = (e) => {
        this.soundPlayer.playEffect('click');
        DragHelper.dragStart(this.coreComponent, e)
    }
    dragOver = (e) => {
        DragHelper.dragOver(this.coreComponent, e)
    }
    dragEnter = (e) => { DragHelper.dragEnter(this.coreComponent, e) }
    dragEnd = (e) => {
        this.soundPlayer.playEffect('drop');
        DragHelper.dragEnd(this.coreComponent, e)
    }
}

export default EventListenerHelper