import React from 'react'

import axios from 'axios'
import api, { curr_user } from 'helpers/api'
import { withRouter } from 'react-router-dom'

import {Row, Col} from 'react-bootstrap'

import Tray from './stations/tray/component'
import Table from './stations/table/component'
import Cupboard from './stations/cupboard/component'
import Examiner from './stations/examiner/component'
import {Link} from 'react-router-dom'

import labSettings from './classes/fields'


import { LabContext, labDefaults } from './labContext'

import DragHelper from './classes/drag'

import {ItemsState} from './classes/itemsState'

class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsState: new ItemsState(),
            hoverPos: {},
            hoverItem: {},
            dragItem: {},
            debug: "",
            masterItemList: { objects: [], containers: [], substances: [], tools: [] },
            experiment: {},
            message: "Welcome! Please choose an experiment.",
            labType: props.location.search.split('=')[1] || 'chemistry'
        }
    }

    componentDidMount = async () => {
        this.dragListeners();

        let objects = await axios.get(api.apiPath('/objects'), curr_user)
        let containers = await axios.get(api.apiPath('/containers'), curr_user)
        let substances = await axios.get(api.apiPath('/substances'), curr_user)
        let tools = await axios.get(api.apiPath('/tools'), curr_user)

        objects = objects.data
        containers = containers.data
        substances = substances.data
        tools = tools.data
        

        this.setState({ masterItemList: { objects, containers, substances, tools } })
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
            this.setState({ experiment })
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
        const heatButtons = document.querySelectorAll('.heat-item')
        const timeButtons = document.querySelectorAll('.time-item')
        const tareButtons = document.querySelectorAll('.tare-item')
        const splitButtons = document.querySelectorAll('.split-item')

        const revealButtons = document.querySelectorAll('.reveal-item')
        const advanceButtons = document.querySelectorAll('.advance-graphic')
        const atpButtons = document.querySelectorAll('.run-atp-item')

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
        for (const heatButton of heatButtons) { heatButton.addEventListener('click', this.heatItem) }
        for (const timeButton of timeButtons) { timeButton.addEventListener('click', this.timeItem) }
        for (const tareButton of tareButtons) { tareButton.addEventListener('click', this.tareItem) }
        for (const splitButton of splitButtons) { splitButton.addEventListener('click', this.splitItem) }
        for (const revealButton of revealButtons) { revealButton.addEventListener('click', this.revealItem) }
        for (const advanceButton of advanceButtons) { advanceButton.addEventListener('click', this.advanceGraphic) }
        for (const atpButton of atpButtons) { atpButton.addEventListener('click', this.runAtpCalculation) }
    }

    emptyItem = (e) => {
        //Get the instance off of the event
        const instance = this.state.itemsState.getInstanceByEvent(e)
        //Empty the container
        instance.emptyContents(this)
        //Update the item in state
        this.state.itemsState.updateInstanceAndState(instance, this)
    }

    removeItem = (e) => { this.state.itemsState.removeItemByEvent(e, this) }
    fillWater =  (e) => { let w = this.state.itemsState.getInstanceByEvent(e) 
        if (w.instance_id) { w.fillWithWater(e, this) }}
    strainItem = (e) => { this.state.itemsState.getInstanceByEvent(e).strainSolidItems(e, this) }
    combineStrainItem = (e) => { this.state.itemsState.getInstanceByEvent(e).combineStrainItems(e, this) }
    heatItem = (e) => { this.state.itemsState.getInstanceByEvent(e).heatItem(e, this) }
    timeItem = (e) => { this.state.itemsState.getInstanceByEvent(e).timeItem(e, this) }
    tareItem = (e) => { this.state.itemsState.getInstanceByEvent(e).setTare(e, this) }
    splitItem = (e) => { this.state.itemsState.getInstanceByEvent(e).splitMixture(e, this) }
    revealItem = (e) => { this.state.itemsState.getInstanceByEvent(e).revealItem(e, this) }
    advanceGraphic = (e) => { this.state.itemsState.getInstanceByEvent(e).advanceGraphic(e, this) }
    runAtpCalculation = (e) => { this.state.itemsState.getInstanceByEvent(e).runAtpCalculation(e, this) }

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

        return <LabContext.Provider value={{ masterItemList: this.state.masterItemList, itemsState: this.state.itemsState, state: this.state }} >
             <a href="/lab?l=chemistry">Chemistry</a> | <a href="/lab?l=biology">Biology</a> | <Link to="/lab?l=physics">Physics</Link>
             <div id="labScreen" style={{backgroundImage: `url('/images/${labSettings[this.state.labType].backgroundImage}')` }}>
                {this.state.message ?
                    <div id="gameMessage">{this.state.message} <span className="fas fa-times" onClick={this.clearMessage}></span></div> :
                    null}
                <div id="topPart">
                    <Examiner />  
                </div>
                <div id="midPart">
                    <Table />
                </div>
                <div id="bottomPart">
                    <Cupboard />
                </div>
            </div>

            {devMode ? <div>
                <h3>Developer Output for Testing:</h3>
                <Row>
                            <Col lg={1}>Name</Col>
                            <Col lg={1}>itemType</Col>
                            <Col lg={2}>Record</Col>
                            <Col lg={2}>Ingredient</Col>
                            <Col lg={2}>UsedItem</Col>
                            <Col lg={2}>Contents</Col>
                            <Col lg={1}>InstanceId</Col>
                            <Col lg={1}>Area,Pos</Col>
                        </Row>
                <div>{
                    Object.entries(this.state.itemsState.list || {}).map(o => <div>
                        <Row>
                            <Col lg={1}>{o[1].name}</Col>
                            <Col lg={1}>{o[1].itemType}</Col>
                            <Col lg={2}>
                                <DevShow info={o[1].record} />
                            </Col>
                            <Col lg={2}>
                                <DevShow info={o[1].ingredient} />
                            </Col>
                            <Col lg={2}>
                                <DevShow info={o[1].usedItem} />
                            </Col>
                            <Col lg={2}>
                                <DevShow info={o[1].contents} />
                            </Col>
                            <Col lg={1}>{o[1].instance_id}</Col>
                            <Col lg={1}>{o[1].area}, {o[1].pos}</Col>
                        </Row>
                    </div>)

                }</div>


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


class DevShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            show: false 
        }
    }

    toggleShow = () => {
        this.setState({show: !this.state.show})
    }

    render() {
        if(this.state.show) {
            return <div style={{zIndex: '99', position:'absolute', textAlign:'left',width: '400px', backgroundColor: 'white'}}>
                <div onClick={this.toggleShow}>[x]</div>{
                this.props.info ? Object.entries(this.props.info).map(i => <p>{i[0]}: {i[1]}</p>) : ""
            }</div>
        } else {
            return <span onClick={this.toggleShow}>[+]</span>
        }
    }
}