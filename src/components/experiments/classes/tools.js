import ClassHelpers from './itemsState'
import MasterListHelper from './masterList'

function addItemToTool(itemsState, itemItem, toolItem) {
    let toolInstance = ClassHelpers.get_instance_by_id(itemsState, toolItem.instance)
    let itemInstance = ClassHelpers.get_instance_by_id(itemsState, itemItem.instance)

    if (itemItem.itemType === 'containers' && toolInstance.usedItem?.itemType === 'substances') {
        itemsState = itemsState.filter(obj => obj.instance !== itemItem.instance && obj.instance != toolItem.instance)

        itemInstance.contents.push(toolInstance.usedItem)
        toolInstance.usedItem = {}

        itemsState.push(toolInstance, itemInstance)
    } else if (!toolInstance.usedItem.name) {

        //temporarily remove the item from state
        itemsState = itemsState.filter(obj => obj.instance !== itemItem.instance && obj.instance != toolItem.instance)

        //delete the pos & area to free up the space
        delete itemInstance.pos
        delete itemInstance.area

        //Set to used item, and push to state.
        toolInstance.usedItem = itemInstance
        itemsState.push(toolInstance)
    }


    return itemsState
}

function addSubstanceToScoopTool(itemsState, toolItem, substanceItem, component) {
    let toolInstance = ClassHelpers.get_instance_by_id(itemsState, toolItem.instance)
    let substanceInstance = ClassHelpers.get_instance_by_id(itemsState, substanceItem.instance)

    let toolRecord = MasterListHelper.getTool(component.state.masterItemList, toolInstance)
    let substanceRecord = MasterListHelper.getSubstance(component.state.masterItemList, substanceInstance)


    if (toolRecord.tool_properties.indexOf('scoop') > -1) {
        if (toolInstance.usedItem?.name) {
            component.setState({ message: "There is already something in the scoop." })
        } else {
            itemsState = itemsState.filter(obj => obj.instance !== toolInstance.instance )

            //Set to used item, and push to state.
            toolInstance.usedItem = {
                ...substanceInstance,
                instance: ClassHelpers.newInstanceId(itemsState),
            }
            itemsState.push(toolInstance)

        }
    } else {
        component.setState({ message: "You need a tool that can scoop to do that." })
    }

    return itemsState
}


function strainItem(component, event) {
    let {itemsState, masterItemList} = component.state
    let strainer = ClassHelpers.get_instance_by_event(itemsState, event)

    if(strainer.usedItem.itemType === 'containers'){  
        itemsState = itemsState.filter(obj => obj.instance !== strainer.instance )

        let itemContents = strainer.usedItem.contents
        let solidContents = []
        let liquidContents = []
        itemContents.map(i => {
            let iRecord = MasterListHelper.getRecord(masterItemList, i.itemType, i) 
            if(iRecord.substance_state_of_matter === 'liquid') { liquidContents.push(i) }
            else { solidContents.push(i)}
        })


        strainer.contents = [...(strainer.contents || []), ...solidContents]
        strainer.usedItem.contents = liquidContents
      
        itemsState.push(strainer)
    } else {
        component.setState({message: "You can only strain containers."})
    }
    component.setState({itemsState})
}

function combineStrainItem(component, event) {
    let {itemsState} = component.state
    let strainer = ClassHelpers.get_instance_by_event(itemsState, event)

    if(strainer.usedItem.itemType === 'containers'){  
        itemsState = itemsState.filter(obj => obj.instance !== strainer.instance )

        let contents = strainer.contents
        strainer.contents = []
        strainer.usedItem.contents = [...strainer.usedItem.contents, ...contents]
      
        itemsState.push(strainer)
    } else {
        component.setState({message: "You can only combine into a container."})
    }
    component.setState({itemsState})
}


export default {
    addItemToTool,
    addSubstanceToScoopTool,
    strainItem,
    combineStrainItem
}