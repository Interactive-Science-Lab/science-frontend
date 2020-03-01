import ClassHelpers from './itemsState'
import MasterListHelper from './masterList'

function addItemToTool(itemsState, dragItem, hoverItem) {
    let hoverInstance = ClassHelpers.get_instance_by_id(itemsState, hoverItem.instance)
    let dragInstance = ClassHelpers.get_instance_by_id(itemsState, dragItem.instance)

    //temporarily remove the item from state
    itemsState = itemsState.filter(obj => obj.instance !== dragItem.instance && obj.instance != hoverItem.instance)

    //delete the pos & area to free up the space
    delete dragInstance.pos
    delete dragInstance.area

    //Set to used item, and push to state.
    hoverInstance.usedItem = dragInstance
    itemsState.push(hoverInstance)
    return itemsState
}

export default {
    addItemToTool
}