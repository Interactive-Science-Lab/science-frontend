import ClassHelpers from './itemsState'
import MasterListHelper from './masterList'

import ContainerHelper from './containers'
import ToolHelper from './tools'

function dragStart(component, e) {
    e.dataTransfer.effectAllowed = "move";

    component.setState({
        dragItem: {
            instance: Number.parseInt(e.target.getAttribute('data-instance')),
            itemType: e.target.getAttribute('data-itemType')
        }
    })
    setTimeout(() => (component.className = 'invisible'))
}

function dragEnd(component, e) {
    let { hoverPos, hoverItem, dragItem, itemsState } = component.state

    //Get the instance ids and possibly the parent id if it's being moved from a tool. 
    const inst_id = Number.parseInt(e.target.getAttribute('data-instance'))
    const parent_inst_id = Number.parseInt(e.target.getAttribute('data-parent-instance'))


    //If the position is free, just move it.
    if (ClassHelpers.checkPositionFree(hoverPos, itemsState)) {
        ClassHelpers.updateItemPosition(inst_id, itemsState, hoverPos, parent_inst_id)
    } 
    //If it's a container, and the other object is an item, move in into the container.
    else if (hoverItem.instance && hoverItem.itemType === 'containers' && dragItem.itemType !== 'containers' && dragItem.itemType !== 'tools') {
        itemsState = ContainerHelper.addItemToContainer(itemsState, dragItem, hoverItem, component.state.masterItemList)
    } 
    //If it's a object, and the other object is a container, move it to the container. 
    else if (hoverItem.instance && hoverItem.itemType === 'objects' && dragItem.itemType === 'containers') {
        itemsState = ContainerHelper.addItemToContainer(itemsState, hoverItem, dragItem, component.state.masterItemList)
    }
    //If it's a tool, and the other object isn't, move it to the tool. 
    else if (hoverItem.instance && hoverItem.itemType === 'tools' && dragItem.itemType !== 'tools') {
        itemsState = ToolHelper.addItemToTool(itemsState, dragItem, hoverItem)
    }
    //If it's a object, and the other object is a tool, move it to the tool. 
    else if (hoverItem.instance && hoverItem.itemType !== 'tools' && dragItem.itemType === 'tools') {
        itemsState = ToolHelper.addItemToTool(itemsState, hoverItem, dragItem)
    }
    //Otherwise, we'll throw an error.
    else if (hoverItem.instance !== dragItem.instance) {
        if (hoverItem.instance && hoverItem.itemType === 'containers' && dragItem.itemType === 'containers') {
            component.setState({ message: "You cannot drag a container to a container." })
        } else if (hoverItem.instance && hoverItem.itemType === 'tools' && dragItem.itemType === 'tools') {
            component.setState({ message: "You cannot drag a tool to a tool." })
        }
    }


    component.setState({ itemsState: itemsState, hoverItem: {}, hoverPos: {}, dragItem: {} })
}

function dragOver(component, e) {
    if (e.target.matches('.dropzone') || e.target.matches('.dropzoneempty')) {
        e.preventDefault();
    }
    else if (
        component.state.hoverItem.itemType === 'containers' || 
        component.state.hoverItem.itemType === 'tools' ||
        (component.state.hoverItem.itemType === 'objects' && component.state.dragItem.itemType === 'containers') ||
        (component.state.hoverItem.itemType === 'objects' && component.state.dragItem.itemType === 'containers') ) {
        e.preventDefault();
    }

}

function dragEnter (component, e) {
    if (e.target.matches('.dropzone')) {
        const pos = Number.parseInt(e.target.getAttribute('data-pos'))
        const area = Number.parseInt(e.target.getAttribute('data-area'))
        component.setState({ hoverItem: {}, hoverPos: { pos, area } })
    }
    else if (e.target.matches('.drag-item')) {
        const dropzone = e.target.closest('.dropzone')
        const pos = Number.parseInt(dropzone.getAttribute('data-pos'))
        const area = Number.parseInt(dropzone.getAttribute('data-area'))
        component.setState({
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
            component.setState({
                hoverItem: {
                    instance: Number.parseInt(dragItem.getAttribute('data-instance')),
                    itemType: dragItem.getAttribute('data-itemType')
                },
                hoverPos: { pos, area }
            })
        } else {
            const pos = Number.parseInt(dropzone.getAttribute('data-pos'))
            const area = Number.parseInt(dropzone.getAttribute('data-area'))
            component.setState({
                hoverPos: { pos, area }
            })

        }
    }

}






function dragInventoryStart(component, e) {
    e.dataTransfer.effectAllowed = "copy";

        const itemType = e.target.getAttribute('data-itemType')
        const id = Number.parseInt(e.target.getAttribute('data-id'))
        const name = e.target.getAttribute('data-name')
        const instance = ClassHelpers.newInstanceId(component.state.itemsState)


        component.setState({
            dragItem: {
                instance,
                itemType,
                id,
                name
            }
        })
}


function dragInventoryEnd(component, e) {
    const { hoverPos, dragItem, itemsState } = component.state

    if (ClassHelpers.checkPositionFree(hoverPos, itemsState) && dragItem.itemType && dragItem.id) {
        let updateObj = dragItem
        updateObj.pos = hoverPos.pos
        updateObj.area = hoverPos.area
        if (updateObj.itemType === 'containers') {
            updateObj.contents = []
        }
        if (updateObj.itemType === 'tools') {
            updateObj.usedItem = {}
        }
        itemsState.push(updateObj)
    } else {
        component.setState({ message: "You must move to an empty space first." })
    }

    component.setState({ itemsState: itemsState, hoverItem: {}, hoverPos: {}, dragItem: {} })
}

export default {
    dragStart,
    dragEnd,
    dragOver,
    dragEnter,
    dragInventoryStart,
    dragInventoryEnd
}