import MasterListHelper from './masterList'


function dragStart(component, e) {
    e.dataTransfer.effectAllowed = "move";

    let imgSrc = e.target.getAttribute('data-imgSrc')
    // console.log(imgSrc)
    // var img = new Image();
    // img.src = imgSrc;  
    // img.style.width = '48px !important' 
    // e.dataTransfer.setDragImage(img, 6, 6);

    var dragIcon = document.createElement('img');
    dragIcon.src = imgSrc;
    dragIcon.height = '64';
    var div = document.createElement('div');
    div.appendChild(dragIcon);
    document.querySelector('body').appendChild(div);
    e.dataTransfer.setDragImage(div, -10, -10);

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
    //const inst_id = Number.parseInt(e.target.getAttribute('data-instance'))
    const parent_inst_id = Number.parseInt(e.target.getAttribute('data-parent-instance'))

    const hoverInstance = itemsState.getInstance(hoverItem.instance)
    const dragInstance = itemsState.getInstance(dragItem.instance)

    if (true/*hoverItem.instance !== dragItem.instance && hoverPos.area !== dragInstance.area && hoverPos.pos !== dragInstance.pos*/) {
        //If the position is free, just move it.
        if (itemsState.checkPosition(hoverPos) && !(dragItem.itemType === 'substances' && parent_inst_id)) {
            dragInstance.updatePosition(hoverPos)
            if (parent_inst_id) {
                console.log(parent_inst_id)
                let parentInstance = itemsState.getInstance(parent_inst_id)
                parentInstance.clearItem()
                console.log(parentInstance)
                itemsState.updateInstanceAndState(parentInstance, component)
            }
        }
        else if (hoverInstance.instance_id) {
            if (hoverInstance.isType('objects') && dragInstance.isType('objects')) {
                hoverInstance.checkSynthesis(dragInstance, component)
            }
            else if (hoverInstance.isType('tools') && dragInstance.isType('tools')) {
                hoverInstance.checkDissection(dragInstance, component)
            }
            //If it's a container, and the other object is an item, move in into the container.
            else if (hoverInstance.isType('containers') && dragInstance.isType('objects')) {
                itemsState.updateInstanceAndState(hoverInstance.addToContents(dragInstance, component), component)
            }
            //[Reverse of above- allowing dragging a container to an obect] 
            //If it's a object, and the other object is a container, move it to the container. 
            else if (hoverInstance.isType('objects') && dragInstance.isType('containers')) {
                itemsState.updateInstanceAndState(dragInstance.addToContents(hoverInstance, component), component)
            }

            //If it's a tool, and the other object is an object/container, move it to the tool. 
            else if (hoverInstance.isType('tools') && dragInstance.isType(['objects', 'containers'])) {
                hoverInstance.addItem(dragInstance, component)
                if (parent_inst_id) {
                    console.log(parent_inst_id)
                    let parentInstance = itemsState.getInstance(parent_inst_id)
                    parentInstance.clearItem()
                    console.log(parentInstance)
                    itemsState.updateInstance(parentInstance)
                }
                itemsState.updateInstance(hoverInstance)
                itemsState.updateInstance(dragInstance)
                itemsState.updateState(component)
            }
            //If it's a object/container, and the other object is a tool, move it to the tool. 
            else if (hoverInstance.isType(['objects', 'containers']) && dragInstance.isType('tools')) {
                dragInstance.addItem(hoverInstance, component)
                if (parent_inst_id) {
                    console.log(parent_inst_id)
                    let parentInstance = itemsState.getInstance(parent_inst_id)
                    parentInstance.clearItem()
                    console.log(parentInstance)
                    itemsState.updateInstance(parentInstance)
                }
                itemsState.updateInstance(dragInstance)
                itemsState.updateInstance(hoverInstance)
                itemsState.updateState(component)
            }

            //If it's a substance, and the other object is a tool, try to move it to the tool.
            else if (hoverInstance.isType('substances') && dragInstance.isType('tools')) {
                itemsState.updateInstanceAndState(dragInstance.addSubstanceToScoopTool(hoverInstance, component), component)
            }
            //Reverse of above.
            else if (dragInstance.isType('substances') && hoverInstance.isType('tools')) {
                itemsState.updateInstanceAndState(hoverInstance.addSubstanceToScoopTool(dragInstance, component), component)
            }

            //If you're dragging one container to another, combine them
            else if (hoverInstance.isType('containers') && dragInstance.isType('containers')) {
                hoverInstance.contents.combineMixture(dragInstance.contents, component)
                dragInstance.emptyContents(component)
                itemsState.updateInstance(dragInstance)
                itemsState.updateInstance(hoverInstance)
                itemsState.updateState(component)
            }
        }
    }


    component.setState({ itemsState: itemsState, hoverItem: {}, hoverPos: {}, dragItem: {} })
}

//Drag over only controls which elements appear as if you can "drop" into them, that's the "preventDefault" line
function dragOver(component, e) {
    if (e.target.matches('.dropzone') || e.target.matches('.dropzoneempty')) {
        e.preventDefault();
    }
    else if (
        component.state.hoverItem.itemType === 'containers' ||
        component.state.hoverItem.itemType === 'tools' ||
        (component.state.hoverItem.itemType === 'objects' && component.state.dragItem.itemType === 'containers') ||
        (component.state.hoverItem.itemType === 'substances' && component.state.dragItem.itemType === 'tools') ||
        (component.state.hoverItem.itemType === 'objects' && component.state.dragItem.itemType === 'containers')) {
        e.preventDefault();
    }
}

function dragEnter(component, e) {
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
    const options = e.target.getAttribute('data-shelf-option')

    component.setState({
        dragItem: {
            itemType,
            id,
            name,
            options
        }
    })
}


function dragInventoryEnd(component, e) {
    const { hoverPos, dragItem, itemsState } = component.state

    if (itemsState.checkPosition(hoverPos) && dragItem.itemType && dragItem.id) {
        let dragRecord = MasterListHelper.getRecord(component.state.masterItemList, dragItem.itemType, dragItem)
        itemsState.newInstance(dragRecord, dragItem, hoverPos)
        itemsState.updateState(component)
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