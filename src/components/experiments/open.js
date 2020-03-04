import React from 'react'

import itemsState from './db/list'

import axios from 'axios'
import api, { curr_user } from 'helpers/api'
import { withRouter } from 'react-router-dom'

import Tray from './stations/tray/component'
import Table from './stations/table/component'
import Cupboard from './stations/cupboard/component'
import Examiner from './stations/examiner/component'

import { LabContext, labDefaults } from './db/labContext'

import ClassHelpers from './classes/itemsState'
import ContainerHelper from './classes/containers'
import ToolHelper from './classes/tools'
import MasterListHelper from './classes/masterList'
import DragHelper from './classes/drag'

class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsState: [],
            hoverPos: {},
            hoverItem: {},
            dragItem: {},
            debug: "",
            masterItemList: { objects: [], containers: [], substances: [], tools: [] },
            experiment: {},
            message: "Welcome! Please choose an experiment."
        }
    }

    componentDidMount = async () => {
        this.dragListeners();

        let objects = await axios.get(api.apiPath('/objects'), curr_user)
        let containers = await axios.get(api.apiPath('/containers'), curr_user)
        let substances = await axios.get(api.apiPath('/substances'), curr_user)

        objects = objects.data.pageOfItems
        containers = containers.data.pageOfItems
        substances = substances.data.pageOfItems
        let tools = [
            {
                tool_id: 1,
                tool_name: "Balance",
                tool_properties: ['display_mass'],
                tool_image: 'scale.png'
            },
            {
                tool_id: 2,
                tool_name: "Thermometer",
                tool_properties: ['display_temperature'],
                tool_image: 'thermometer.png'
            },
            {
                tool_id: 3,
                tool_name: "pH Meter",
                tool_properties: ['display_ph'],
                tool_image: 'phmeter.png'
            },
            {
                tool_id: 4,
                tool_name: "Strainer",
                tool_properties: ['strain'],
                tool_image: 'strainer.png'
            },
            {
                tool_id: 5,
                tool_name: "Eyedropper",
                tool_properties: ['scoop'],
                tool_image: 'dropper-empty.png'
            },
            {
                tool_id: 6,
                tool_name: "Measuring Cup",
                tool_properties: ['scoop'],
                tool_image: 'measuring.png'
            }
        ]

        this.setState({ masterItemList: { objects, containers, substances, tools }, itemsState: [] })
        this.setExperiment();


    }

    componentDidUpdate = async () => {
        this.dragListeners();
        this.setExperiment();
        if (this.state.message) {
            setTimeout(() => { this.setState({ message: null }) }, 3000);
        }
    }

    setExperiment = async () => {
        const experiment_id = this.props.match.params.id

        if (experiment_id && this.state.experiment.experiment_id !== Number.parseInt(experiment_id)) {
            let experiment = await axios.get(api.apiPath(`/experiments/${experiment_id}`), curr_user)
            experiment = experiment.data
            this.setState({ experiment, itemsState: experiment.experiment_start })
        }
    }

    dragListeners = () => {
        const dragItems = document.querySelectorAll('.drag-item')
        const inventoryItems = document.querySelectorAll('.inventory-item')
        const dropzones = document.querySelectorAll('.dropzone')
        const waterButtons = document.querySelectorAll('.waterButton')
        const emptyButtons = document.querySelectorAll('.empty-item')
        const removeButtons = document.querySelectorAll('.remove-item')

        
        const strainButtons = document.querySelectorAll('.strain-item')
        const combineStrainButtons = document.querySelectorAll('.combine-strain-item')

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

        
        for (const strainButton of strainButtons) { strainButton.addEventListener('click', this.strainItem) }
        for (const combineStrainButton of combineStrainButtons) { combineStrainButton.addEventListener('click', this.combineStrainItem) }
    }

    emptyItem = (e) => {
        //Get the instance off of the event
        const instance = ClassHelpers.get_instance_by_event(this.state.itemsState, e)
        //Empty the container
        ContainerHelper.emptyContainer(instance)
        //Update the item in state
        ClassHelpers.update_item(this, instance)
    }

    removeItem = (e) => { ClassHelpers.remove_item_from_event(this, e) }
    fillWater = async (e) => { ContainerHelper.fillWater(this) }
    strainItem = (e) => { ToolHelper.strainItem(this, e) }
    combineStrainItem = (e) => { ToolHelper.combineStrainItem(this, e) }

    dragInventoryStart = (e) => { DragHelper.dragInventoryStart(this, e) }
    dragInventoryEnd = (e) => { DragHelper.dragInventoryEnd(this, e) }
    dragStart = (e) => { DragHelper.dragStart(this, e) }
    dragOver = (e) => { DragHelper.dragOver(this, e) }
    dragEnter = (e) => { DragHelper.dragEnter(this, e) }
    dragEnd = (e) => { DragHelper.dragEnd(this, e) }

    clearMessage = () => {
        this.setState({ message: null })
    }

    render() {
        const devMode = true

        return <LabContext.Provider value={{ masterItemList: this.state.masterItemList, itemsState: this.state.itemsState }} >

            <div id="labScreen">
                {this.state.message ?
                    <div id="gameMessage">{this.state.message} <span className="fas fa-times" onClick={this.clearMessage}></span></div> :
                    null}
                <div id="topHalf">
                    <Tray />
                    <Cupboard />
                </div>
                <div id="bottomHalf">
                    <Examiner />
                    <Table />
                </div>
            </div>

            {devMode ? <div>
                <h3>Developer Output for Testing:</h3>

                <div style={{ width: '200px' }}>{
                    Object.entries(this.state).map(stateObj => <div>
                        <h5>{stateObj[0]}</h5>
                        <p>{JSON.stringify(stateObj[1])}</p>
                    </div>)

                }</div></div> : null}
        </LabContext.Provider>
    }

}

export default withRouter(ExperimentLab)


