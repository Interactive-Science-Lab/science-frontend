import React from 'react'

import axios from 'axios'
import api, { curr_user } from 'helpers/api'
import { withRouter } from 'react-router-dom'

import LabLayout from "./labLayout/labLayout"
import SoundControls from "./soundControls"

import { LabContext } from '../labContext'

import DragHelper from '../classes/drag'

import { ItemsState } from '../classes/items/itemsState'

import SoundPlayer from '../classes/sounds/soundPlayer'
let soundPlayer = new SoundPlayer()


class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //Class that holds the position of where all the items in the lab are
            itemsState: new ItemsState(),

            hoverPos: {},
            hoverItem: {},
            dragItem: {},

            masterItemList: { objects: [], containers: [], substances: [], tools: [], drawers: [] },

            labType: props.location.search.split('=')[1].split("&")[0] || 'chemistry',
            

        }
    }

    componentDidMount = async () => {
        this.dragListeners();

        let objects = await axios.get(api.apiPath('/objects'), curr_user)
        let containers = await axios.get(api.apiPath('/containers'), curr_user)
        let substances = await axios.get(api.apiPath('/substances'), curr_user)
        let tools = await axios.get(api.apiPath('/tools'), curr_user)
        let drawers = await axios.get(api.apiPath('/drawers'), curr_user)

        objects = objects.data
        containers = containers.data
        substances = substances.data
        tools = tools.data
        drawers = drawers.data

        this.setState({ masterItemList: { objects, containers, substances, tools, drawers } })
    }

    componentDidUpdate = async () => {
        this.dragListeners();

        if (this.state.message) {
            setTimeout(() => { this.setState({ message: null }) }, 3000);
        }
    }

    dragListeners = () => {
        const dragItems = document.querySelectorAll('.drag-item')
        const inventoryItems = document.querySelectorAll('.inventory-item')
        const dropzones = document.querySelectorAll('.dropzone')
        const waterButtons = document.querySelectorAll('.waterButton')
        const emptyButtons = document.querySelectorAll('.empty-item')
        const removeButtons = document.querySelectorAll('.remove-item')

        for (const item of dragItems) {
            item.addEventListener('dragstart', this.dragStart)
            item.addEventListener('dragend', this.dragEnd)
        }

        for (const item of inventoryItems) {
            item.addEventListener('dragstart', this.dragInventoryStart)
            item.addEventListener('dragend', this.dragInventoryEnd)
        }

        for (const dropzone of dropzones) {
            dropzone.addEventListener('dragover', this.dragOver)
            dropzone.addEventListener('dragenter', this.dragEnter)
        }

        for (const waterButton of waterButtons) {
            waterButton.addEventListener('click', this.fillWater)
        }

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
        const instance = this.state.itemsState.getInstanceByEvent(e)
        //Empty the container
        instance.emptyContents(this)
        this.state.soundPlayer.playEffect('remove');
        //Update the item in state
        this.state.itemsState.updateInstanceAndState(instance, this)
    }

    removeItem = (e) => {
        this.state.soundPlayer.playEffect('remove');
        this.state.itemsState.removeItemByEvent(e, this)
    }
    fillWater = (e) => {
        let w = this.state.itemsState.getInstanceByEvent(e)
        if (w.instance_id) {
            this.state.soundPlayer.playEffect('drop');
            w.fillWithWater(e, this)
        } else {
            this.state.soundPlayer.playEffect('error');
        }
    }
    strainItem = (e) => {
        this.state.soundPlayer.playEffect('click');
        this.state.itemsState.getInstanceByEvent(e).strainSolidItems(e, this)
    }
    combineStrainItem = (e) => {
        this.state.soundPlayer.playEffect('click');
        this.state.itemsState.getInstanceByEvent(e).combineStrainItems(e, this)
    }
    heatItem = (e) => {
        this.state.soundPlayer.playEffect('click');
        this.state.itemsState.getInstanceByEvent(e).heatItem(e, this)
    }
    timeItem = (e) => {
        this.state.soundPlayer.playEffect('click');
        this.state.itemsState.getInstanceByEvent(e).timeItem(e, this)
    }
    tareItem = (e) => {
        this.state.soundPlayer.playEffect('click');
        this.state.itemsState.getInstanceByEvent(e).setTare(e, this)
    }
    splitItem = (e) => {
        this.state.soundPlayer.playEffect('click');
        this.state.itemsState.getInstanceByEvent(e).splitMixture(e, this)
    }
    revealItem = (e) => {
        this.state.soundPlayer.playEffect('click');
        this.state.itemsState.getInstanceByEvent(e).revealItem(e, this)
    }
    advanceGraphic = (e) => {
        this.state.soundPlayer.playEffect('click');
        this.state.itemsState.getInstanceByEvent(e).advanceGraphic(e, this)
    }
    runAtpCalculation = (e) => {
        this.state.soundPlayer.playEffect('click');
        this.state.itemsState.getInstanceByEvent(e).runAtpCalculation(e, this)
    }

    openPhysicsWindow = (e) => {
        this.state.soundPlayer.playEffect('click');
    }
    closeButtonEffect = (e) => {
        this.state.soundPlayer.playEffect('remove');
    }

    dragInventoryStart = (e) => {
        this.state.soundPlayer.playEffect('drag');
        DragHelper.dragInventoryStart(this, e)
    }
    dragInventoryEnd = (e) => {
        this.state.soundPlayer.playEffect('drop');
        DragHelper.dragInventoryEnd(this, e)
    }
    dragStart = (e) => {
        this.state.soundPlayer.playEffect('click');
        DragHelper.dragStart(this, e)
    }
    dragOver = (e) => {
        DragHelper.dragOver(this, e)
    }
    dragEnter = (e) => { DragHelper.dragEnter(this, e) }
    dragEnd = (e) => {
        this.state.soundPlayer.playEffect('drop');
        DragHelper.dragEnd(this, e)
    }

    adminBar = () => {
        if (curr_user.user_kind === 'admin_user') {
            return <div className='admin-bar'>
                Select a Class |
                <a href="/lab?l=chemistry">Chemistry</a> |
                <a href="/lab?l=biology">Biology</a> |
                <a href="/lab?l=physics">Physics</a>
            </div>
        }
    }


    render() {
        

        return <LabContext.Provider value={
                { 
                    soundEffects: this.state.soundEffects, 
                    masterItemList: this.state.masterItemList, 
                    itemsState: this.state.itemsState, 
                    soundPlayer: soundPlayer,
                    state: this.state 
                }
            }>

            {this.adminBar()}

            <LabLayout coreComponent={this} soundPlayer={soundPlayer} />

            <SoundControls soundPlayer={soundPlayer} />

        </LabContext.Provider>
    }

}

export default withRouter(ExperimentLab)


