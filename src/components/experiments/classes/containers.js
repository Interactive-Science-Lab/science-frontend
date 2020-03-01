
import ClassHelpers from './itemsState'
import MasterListHelper from './masterList'

function emptyContainer(instance) {
    if (instance.itemType === 'containers') {
        instance.contents = []
        instance.imgNum = 0
        instance.image = null
    }
    return instance
}

function getContainerVolume(itemsState, container){
    let totalVolume = 0;
    if (container.contents) {
        {
            //map over the contents
            container.contents.map(content_item => {
                //get the record 
                const content_record = MasterListHelper.getRecord(itemsState, content_item.itemType, content_item )
                //add that weight to the total
                totalVolume += (content_record.object_volume || content_record.substance_dispense_volume || 0)
            })
        }
    }

    return totalVolume
}

function addItemToContainer (newState, dragItem, hoverItem, masterItemList) {
    //Get the instances & the records
    let hoverInstance = ClassHelpers.get_instance_by_id(newState, hoverItem.instance)
    let dragInstance = ClassHelpers.get_instance_by_id(newState, dragItem.instance)
    let hoverRecord = MasterListHelper.getContainer(masterItemList, hoverInstance)
    let dragRecord = MasterListHelper.getObject(masterItemList, dragInstance)

    //Check the total volume before we agree to add it in.
    const totalVolume = getContainerVolume(hoverInstance, masterItemList)

    if (totalVolume <= (hoverRecord.container_volume - dragRecord.object_volume)) {
        //Filter newState to remove the object from it.
        newState = newState.filter(obj => obj.instance !== dragItem.instance && obj.instance != hoverItem.instance)

        //Get rid of the pos and area attributes
        delete dragInstance.pos
        delete dragInstance.area

        //Push the instance to the contents, and the container back to state.d
        hoverInstance.contents.push(dragInstance)
        newState.push(hoverInstance)
    }
    else {
        this.setState({ message: "This container is filled to the brim." })
    }
    return newState
}



function fillWater (component) {
        //document.body.style.pointerEvents = "none"
        let {itemsState, masterItemList} = component.state

        //Get the item in the sink (area 4, pos 0)
        let updateObj = {}
        itemsState.map(obj => 4 === obj.area && 0 === obj.pos ? updateObj = obj : null)

        //If there is an item there (the .name check), AND it's a container, we fill it up
        if (updateObj.name && updateObj.itemType === 'containers') {
            //Get the total volume, and record for the item.
            const totalVolume = getContainerVolume(updateObj, masterItemList)
            let updateRecord = MasterListHelper.getContainer(masterItemList, updateObj)

            //If there's enough room
            if (totalVolume <= (updateRecord.container_volume - 10)) { //10 IS A HARDCODED VALUE FOR THE DISPENSE RATE OF WATER
                //Temporarily remove the item from state
                itemsState = itemsState.filter(obj => 4 !== obj.area || 0 !== obj.pos)
                //Create a new water object
                updateObj.contents.push({
                    instance: ClassHelpers.newInstanceId(itemsState),
                    itemType: 'substances',
                    id: 1,
                    name: "Water"
                })
                //Update the sprite accordingly
                let imgNum = updateObj.imgNum || 0
                if (updateObj.name === 'Graduated Cylinder') {
                    updateObj.image = `cylinder-${imgNum > 80 ? 80 : imgNum}-light-blue.png`
                }
                updateObj.imgNum = imgNum + 10
                itemsState.push(updateObj)
            }
            else {
                component.setState({ message: "This container is filled to the brim." })
            }
        } else {
            component.setState({ message: "You need to drag a container to the sink in order to get water." })
        }
        component.setState({ itemsState: itemsState })
}

export default {
    emptyContainer,
    getContainerVolume,
    addItemToContainer,
    fillWater
}