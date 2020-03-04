// class ItemsState {
//     constructor() {
//         this.list = []
//     }  
// }


//-----------------------------
//        GET
//----------------------------- 
//Takes in the itemsState list and an id and returns the info associated with instance id.
function get_instance_by_id(itemsState, id) {
    let ret = {}
    itemsState.forEach(inst => inst.instance === Number.parseInt(id) ? ret = inst : null)
    return ret
}

function get_instance_by_event(itemState, e){
    const id = Number.parseInt(e.target.getAttribute('data-instance'))
    return get_instance_by_id(itemState, id)
}

//-----------------------------
//        UPDATE
//-----------------------------
//Passes in the whole component and an update instance object, replaces that instance in it's state.
function update_item(component, instance){
    let newState = component.state.itemsState.filter(obj => Number.parseInt(instance.instance) !== obj.instance)
    newState.push(instance)
    component.setState({ itemsState: newState })
}

//-----------------------------
//        DELETE
//-----------------------------
//Takes in the whole component and the event object, and deletes, updating the state.
function remove_item_from_event(component, e){
    const instance_id = Number.parseInt(e.target.getAttribute('data-instance'))

    //Remove that object from state.
    let newState = component.state.itemsState.filter(obj => Number.parseInt(instance_id) !== obj.instance)
    component.setState({ itemsState: newState })
}



/* When we're dragging an item, we pass in:
 the inst_id, 
 the itemState, 
 the hoverPos object,
 and possibly a parent_inst_id, if we're dragging an item out of a tool

 This function then updates the item, possibly the parent, and adds them back into a the itemsState, which it returns.
 */
function updateItemPosition (inst_id, itemsState, hoverPos, parent_inst_id) {
    let updateObj = {}
    let parent = null

    //If we're dragging an item thats in a tool, we'll have access to a parent_inst_id
    if (parent_inst_id) {
        //Get the item
        parent = get_instance_by_id(itemsState, parent_inst_id) 
        //And we can just get new item obj from here
        updateObj = parent.usedItem
        //Resetting the parent's space and pushing it to the the itemsState.
        parent.usedItem = {}
        
        //itemsState.push(parent)
    }
    //If we're just moving an item, simple:
    else {
        //Get the instance
        updateObj = get_instance_by_id(itemsState, inst_id)
        //Temporarily that object from the state.
        itemsState = itemsState.filter(obj => Number.parseInt(inst_id) !== obj.instance)
    }

    //At this point, we have the updateObj, the hoverPos, and an updated itemsState if a tool is involved.
    //We update the object based on the hoverPos, and push it onto state, returning that.
    updateObj.pos = hoverPos.pos
    updateObj.area = hoverPos.area
    itemsState.push(updateObj)

    return itemsState
}


function checkPositionFree ({ pos, area }, itemsState) {
    let posFree = (pos || pos === 0) && area
    itemsState.map(item => item.pos === pos && item.area === area ? posFree = false : null)
    return posFree
}

function newInstanceId (itemsState) {
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





export default {
    get_instance_by_id,
    get_instance_by_event,
    update_item,
    remove_item_from_event,
    updateItemPosition,
    checkPositionFree, 
    newInstanceId

}