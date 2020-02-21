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

    get_instance = (id) => {
        let ret = {}
        this.state.itemsState.forEach(inst => inst.instance === Number.parseInt(id) ? ret = inst : null)
        return ret
    }

    emptyItem = (e) => {
        const instance_id = Number.parseInt(e.target.getAttribute('data-instance'))
        const instance = this.get_instance(instance_id)

        //let record = null
        //this.state.masterItemList['containers'].map(i => i.container_id === instance.id ? record = i : null)

        if (instance.itemType === 'containers') {
            instance.contents = []
            instance.imgNum = 0
            instance.image = null
        }

        //Remove that object from state & add the edited back in
        let newState = this.state.itemsState.filter(obj => Number.parseInt(instance_id) !== obj.instance)
        newState.push(instance)
        this.setState({ itemsState: newState })
    }


    removeItem = (e) => {
        const instance_id = Number.parseInt(e.target.getAttribute('data-instance'))

        //Remove that object from state.
        let newState = this.state.itemsState.filter(obj => Number.parseInt(instance_id) !== obj.instance)
        this.setState({ itemsState: newState })
    }

    updateItemPosition = (inst_id, newState, hoverPos, parent_inst_id) => {
        let updateObj = {}
        let parent = null

        if (parent_inst_id) {
            //Map the state to store the parent in the variable
            newState.map(obj => Number.parseInt(parent_inst_id) === obj.instance ? parent = obj : null)
            updateObj = parent.usedItem
            parent.usedItem = {}
            newState.push(parent)
        }
        else {
            //Map the state to store the object we're updating in the variable
            newState.map(obj => Number.parseInt(inst_id) === obj.instance ? updateObj = obj : null)
            //Remove that object from state.
            newState = newState.filter(obj => Number.parseInt(inst_id) !== obj.instance)
        }

        updateObj.pos = hoverPos.pos
        updateObj.area = hoverPos.area
        newState.push(updateObj)

        return newState
    }

    addItemToContainer = (newState, dragItem, hoverItem) => {
        let hoverInstance = {}
        let dragInstance = {}
        let hoverRecord = null
        let dragRecord = null

        newState.map(obj => {
            if (dragItem.instance === obj.instance) { dragInstance = obj }
            else if (obj.instance === hoverItem.instance) { hoverInstance = obj }
        })

        this.state.masterItemList['containers'].map(i => i.container_id === hoverInstance.id ? hoverRecord = i : null)
        this.state.masterItemList['objects'].map(i => i.object_item_id === dragInstance.id ? dragRecord = i : null)

        let totalVolume = 0;
        if (hoverInstance.contents) {
            {
                hoverInstance.contents.map(c => <div>
                    {this.state.masterItemList[c.itemType].map(r =>
                        (r.substance_id === c.id && c.itemType === 'substances') || (r.object_item_id === c.id && c.itemType === 'objects') ?
                            totalVolume += (r.object_volume || r.substance_dispense_volume || 0) : "")}
                </div>)
            }
        }

        if (totalVolume <= (hoverRecord.container_volume - dragRecord.object_volume)) {
            newState = newState.filter(obj => obj.instance !== dragItem.instance && obj.instance != hoverItem.instance)

            delete dragInstance.pos
            delete dragInstance.area

            hoverInstance.contents.push(dragInstance)
            newState.push(hoverInstance)
        }
        else {
            this.setState({ message: "This container is filled to the brim." })
        }
        return newState



    }

    addItemToTool = (newState, dragItem, hoverItem) => {
        let hoverInstance = {}
        let dragInstance = {}

        newState.map(obj => {
            if (dragItem.instance === obj.instance) { dragInstance = obj }
            else if (obj.instance === hoverItem.instance) { hoverInstance = obj }
        })

        newState = newState.filter(obj => obj.instance !== dragItem.instance && obj.instance != hoverItem.instance)

        delete dragInstance.pos
        delete dragInstance.area

        hoverInstance.usedItem = dragInstance
        newState.push(hoverInstance)
        return newState
    }


    checkPositionFree = ({ pos, area }, hoverItem, newState) => {
        let posFree = (pos || pos === 0) && area
        newState.map(item => item.pos === pos && item.area === area ? posFree = false : null)
        return posFree
    }

    newInstanceId = (itemsState) => {
        let new_instance_id = 0
        itemsState.map(item => {
            if (item.instance > new_instance_id) {
                new_instance_id = item.instance
            }
            if (item.contents) {
                item.contents.map(i => {
                    if (i.instance > new_instance_id) {
                        new_instance_id = i.instance
                    }
                })
            }
            if (item.usedItem) {
                if (item.usedItem.instance > new_instance_id) {
                    new_instance_id = item.usedItem.instance
                }
            }
        })
        return new_instance_id + 1
    }

    fillWater = async (e) => {
        //document.body.style.pointerEvents = "none"
        let newState = this.state.itemsState
        let updateObj = {}

        newState.map(obj => 4 === obj.area && 0 === obj.pos ? updateObj = obj : null)

        if (updateObj.name && updateObj.itemType === 'containers') {
            let totalVolume = 0;
            if (updateObj.contents) {
                {
                    updateObj.contents.map(c => <div>
                        {this.state.masterItemList[c.itemType].map(r =>
                            (r.substance_id === c.id && c.itemType === 'substances') || (r.object_item_id === c.id && c.itemType === 'objects') ?
                                totalVolume += (r.object_volume || r.substance_dispense_volume || 0) : "")}
                    </div>)
                }
            }

            let updateRecord = null
            this.state.masterItemList['containers'].map(i => i.container_id === updateObj.id ? updateRecord = i : null)

            if (totalVolume <= (updateRecord.container_volume - 10)) {

                newState = newState.filter(obj => 4 !== obj.area || 0 !== obj.pos)
                updateObj.contents.push({
                    instance: this.newInstanceId(this.state.itemsState),
                    itemType: 'substances',
                    id: 1,
                    name: "Water"
                })
                let imgNum = updateObj.imgNum || 0

                if (updateObj.name === 'Graduated Cylinder') {
                    updateObj.image = `cylinder-${imgNum > 80 ? 80 : imgNum}-light-blue.png`
                }

                updateObj.imgNum = imgNum + 10
                newState.push(updateObj)
            }
            else {
                this.setState({ message: "This container is filled to the brim." })
            }
        } else {
            this.setState({ message: "You need to drag a container to the sink in order to get water." })
        }


        this.setState({ itemsState: newState })

    }

    dragInventoryStart = (e) => {
        e.dataTransfer.effectAllowed = "copy";

        const itemType = e.target.getAttribute('data-itemType')
        const id = Number.parseInt(e.target.getAttribute('data-id'))
        const name = e.target.getAttribute('data-name')
        const instance = this.newInstanceId(this.state.itemsState)


        this.setState({
            dragItem: {
                instance,
                itemType,
                id,
                name
            }
        })
    }

    dragInventoryEnd = (e) => {
        const { hoverPos, hoverItem, dragItem } = this.state
        let newState = this.state.itemsState

        if (this.checkPositionFree(hoverPos, hoverItem, newState) && dragItem.itemType && dragItem.id) {
            let updateObj = dragItem
            updateObj.pos = hoverPos.pos
            updateObj.area = hoverPos.area
            if (updateObj.itemType === 'containers') {
                updateObj.contents = []
            }
            if (updateObj.itemType === 'tools') {
                updateObj.usedItem = {}
            }
            newState.push(updateObj)
        } else {
            this.setState({ message: "You must move to an empty space first." })
        }

        this.setState({ itemsState: newState, hoverItem: {}, hoverPos: {}, dragItem: {} })
    }

    dragStart = (e) => {
        e.dataTransfer.effectAllowed = "move";

        this.setState({
            dragItem: {
                instance: Number.parseInt(e.target.getAttribute('data-instance')),
                itemType: e.target.getAttribute('data-itemType')
            }
        })
        setTimeout(() => (this.className = 'invisible'))
    }

    dragEnd = (e) => {
        //e.target.className = 'drag-item'
        const objType = e.target.getAttribute('data-itemtype')
        const inst_id = Number.parseInt(e.target.getAttribute('data-instance'))

        const parent_inst_id = Number.parseInt(e.target.getAttribute('data-parent-instance'))

        const { hoverPos, hoverItem, dragItem } = this.state
        let newState = this.state.itemsState

        if (this.checkPositionFree(hoverPos, hoverItem, newState)) {
            this.updateItemPosition(inst_id, newState, hoverPos, parent_inst_id)
        } else if (hoverItem.instance && hoverItem.itemType === 'containers' && dragItem.itemType !== 'containers' && dragItem.itemType !== 'tools') {
            newState = this.addItemToContainer(newState, dragItem, hoverItem)
        } else if (hoverItem.instance && hoverItem.itemType === 'tools' && dragItem.itemType !== 'tools') {
            newState = this.addItemToTool(newState, dragItem, hoverItem)
        }

        else if (hoverItem.instance !== dragItem.instance) {
            if (hoverItem.instance && hoverItem.itemType === 'containers' && dragItem.itemType === 'containers') {
                this.setState({ message: "You cannot drag a container to a container." })
            } else if (hoverItem.instance && hoverItem.itemType === 'containers' && dragItem.itemType === 'tools') {
                this.setState({ message: "You cannot drag a tool to a container, you must drag the container to the tool." })
            } else if (hoverItem.instance && hoverItem.itemType === 'tools' && dragItem.itemType === 'tools') {
                this.setState({ message: "You cannot drag a tool to a tool." })
            }
        }


        this.setState({ itemsState: newState, hoverItem: {}, hoverPos: {}, dragItem: {} })
    }

    dragOver = (e) => {
        if (e.target.matches('.dropzone') || e.target.matches('.dropzoneempty')) {
            e.preventDefault();
        }
        else if (this.state.hoverItem.itemType === 'containers' || this.state.hoverItem.itemType === 'tools') {
            e.preventDefault();
        }

    }
    dragEnter = (e) => {
        if (e.target.matches('.dropzone')) {
            const pos = Number.parseInt(e.target.getAttribute('data-pos'))
            const area = Number.parseInt(e.target.getAttribute('data-area'))
            this.setState({ hoverItem: {}, hoverPos: { pos, area } })
        }
        else if (e.target.matches('.drag-item')) {
            const dropzone = e.target.closest('.dropzone')
            const pos = Number.parseInt(dropzone.getAttribute('data-pos'))
            const area = Number.parseInt(dropzone.getAttribute('data-area'))
            this.setState({
                hoverItem: {
                    instance: Number.parseInt(e.target.getAttribute('data-instance')),
                    itemType: e.target.getAttribute('data-itemType')
                },
                hoverPos: { pos, area }
            })
        }

        if (e.target.closest('.dropzone')) {
            let dropzone = e.target.closest('.dropzone')
            if (e.target.closest('.drag-item')) {
                let dragItem = e.target.closest('.drag-item')
                const pos = Number.parseInt(dropzone.getAttribute('data-pos'))
                const area = Number.parseInt(dropzone.getAttribute('data-area'))
                this.setState({
                    hoverItem: {
                        instance: Number.parseInt(dragItem.getAttribute('data-instance')),
                        itemType: dragItem.getAttribute('data-itemType')
                    },
                    hoverPos: { pos, area }
                })
            } else {
                const pos = Number.parseInt(dropzone.getAttribute('data-pos'))
                const area = Number.parseInt(dropzone.getAttribute('data-area'))
                this.setState({
                    hoverPos: { pos, area }
                })

            }
        }

    }
    dragLeave = (e) => {
        if (e.target.matches('.dropzone')) {
        }
        else if (e.target.matches('.drag-item')) {
        }
        else {
        }
    }
    dragDrop = (e) => {
        e.preventDefault();
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
        console.log(this.props.match.params)

        if (experiment_id && this.state.experiment.experiment_id !== Number.parseInt(experiment_id)) {
            let experiment = await axios.get(api.apiPath(`/experiments/${experiment_id}`), curr_user)
            experiment = experiment.data

            console.log(experiment)

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
            dropzone.addEventListener('dragleave', this.dragLeave)
            dropzone.addEventListener('drop', this.dragDrop)
        }

        for (const waterButton of waterButtons) {
            waterButton.addEventListener('click', this.fillWater)
        }

        for (const removeButton of removeButtons) {
            removeButton.addEventListener('click', this.removeItem)
        }

        for (const emptyButton of emptyButtons) {
            emptyButton.addEventListener('click', this.emptyItem)
        }

    }

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


