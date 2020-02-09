import React from 'react'

import Tray from './stations/tray/component'
import Table from './stations/table/component'
import Cupboard from './stations/cupboard/component'
import Examiner from './stations/examiner/component'

import { LabContext, labDefaults } from './db/labContext'

class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsState: labDefaults.itemsState,
            hoverPos: {},
            hoverItem: {},
            dragItem: {}
        }
    }

    get_instance = (id) => {
        let ret = {}
        this.state.list.forEach(inst => inst.instance === Number.parseInt(id) ? ret = inst : null)
        return ret
    }

    updateItemPosition = (inst_id, newState, hoverPos) => {
        let updateObj = {}

        newState.map(obj => Number.parseInt(inst_id) === obj.instance ? updateObj = obj : null)
        newState = newState.filter(obj => Number.parseInt(inst_id) !== obj.instance)

        updateObj.pos = hoverPos.pos
        updateObj.area = hoverPos.area

        return newState.push(updateObj)
    }

    addItemToContainer = (newState, dragItem, hoverItem) => {
        let hoverInstance = {}
        let dragInstance = {}

        newState.map(obj => {
            if (dragItem.instance === obj.instance) { dragInstance = obj }
            else if (obj.instance === hoverItem.instance) { hoverInstance = obj }
        })

        newState = newState.filter(obj => obj.instance !== dragItem.instance && obj.instance != hoverItem.instance)

        delete dragInstance.pos
        delete dragInstance.area

        hoverInstance.contents.push(dragInstance)
        return newState.push(hoverInstance)
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
        })
        return new_instance_id + 1
    }

    fillWater = async (e) => {
        //document.body.style.pointerEvents = "none"
        let newState = this.state.itemsState
        let updateObj = {}

        newState.map(obj => 4 === obj.area && 0 === obj.pos ? updateObj = obj : null)

        if (updateObj.name) {
            newState = newState.filter(obj => 4 !== obj.area || 0 !== obj.pos)
            updateObj.contents.push({
                instance: this.newInstanceId(this.state.itemsState),
                itemType: 'substances',
                id: 1,
                name: "Water"
            })
            updateObj.image = 'ScienceTool_256_009.png'
            newState.push(updateObj)
        }
        this.setState({ itemsState: newState })


        //document.body.style.pointerEvents = "auto"

    }

    dragInventoryStart = (e) => {
        e.dataTransfer.effectAllowed = "copy";

        const itemType = e.target.getAttribute('data-itemType')
        const id = Number.parseInt(e.target.getAttribute('data-id'))
        const name = e.target.getAttribute('data-itemType')
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
            newState.push(updateObj)
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
        e.target.className = 'drag-item'
        const objType = e.target.getAttribute('data-itemtype')
        const inst_id = Number.parseInt(e.target.getAttribute('data-instance'))

        const { hoverPos, hoverItem, dragItem } = this.state
        let newState = this.state.itemsState

        if (this.checkPositionFree(hoverPos, hoverItem, newState)) {
            this.updateItemPosition(inst_id, newState, hoverPos)
        } else if (hoverItem.instance && hoverItem.itemType === 'containers' && dragItem.itemType !== 'containers') {
            this.addItemToContainer(newState, dragItem, hoverItem)
        }

        this.setState({ itemsState: newState, hoverItem: {}, hoverPos: {}, dragItem: {} })
    }

    dragOver = (e) => {
        if (e.target.matches('.dropzone')) {
            e.preventDefault();
        }
        else if (this.state.hoverItem.itemType === 'containers') {
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
            this.setState({ hoverItem: { instance: Number.parseInt(e.target.getAttribute('data-instance')), itemType: e.target.getAttribute('data-itemType') } })
        }
        else {
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

    componentDidMount = () => {
        this.dragListeners();
    }

    componentDidUpdate = () => {
        this.dragListeners();
    }

    dragListeners = () => {
        const dragItems = document.querySelectorAll('.drag-item')
        const inventoryItems = document.querySelectorAll('.inventory-item')
        const dropzones = document.querySelectorAll('.dropzone')
        const waterButtons = document.querySelectorAll('.waterButton')

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

    }

    render() {

        return <LabContext.Provider value={{ ...labDefaults, itemsState: this.state.itemsState }} >
            <div id="labScreen">
                <div id="topHalf">
                    <Tray />
                    <Cupboard />
                </div>
                <div id="bottomHalf">
                    <Examiner />
                    <Table />
                </div>
            </div>
            <h3>Developer Output for Testing:</h3>

            <div style={{ width: '200px' }}>{
                Object.entries(this.state).map(stateObj => <div>
                    <h5>{stateObj[0]}</h5>
                    <p>{JSON.stringify(stateObj[1]).split('},{').map(i => <div>{i}</div>)}</p>
                </div>)

            }</div>



        </LabContext.Provider>
    }

}

export default ExperimentLab


