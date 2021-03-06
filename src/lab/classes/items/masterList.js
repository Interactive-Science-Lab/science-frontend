function getRecord(masterItemList, itemType, instance) {
    let returnRecord = null
    if (itemType && instance.id) {
        //One liner to parse itemType to id_field
        const id_field = ['container_id', 'object_item_id', 'substance_id', 'tool_id'][['containers', 'objects', 'substances', 'tools'].indexOf(itemType)]
        masterItemList[itemType].map(i => i[id_field] === instance.id ? returnRecord = i : null)
    }
    return returnRecord
}

//Just shorthands
function getContainer(masterItemList, id) {
    return getRecord(masterItemList, 'containers', id)
}
function getObject(masterItemList, id) {
    return getRecord(masterItemList, 'objects', id)
}
function getSubstance(masterItemList, id) {
    return getRecord(masterItemList, 'substances', id)
}
function getTool(masterItemList, id) {
    return getRecord(masterItemList, 'tools', id)
}

function getRecordByNameAndType(masterItemList, name, itemType) {
    let ret = {}
    if (itemType && name) {
         masterItemList[itemType].map(i => i.display_name === name ? ret = i : null)
    }
    return ret
}


export default {
    getRecord,
    getContainer,
    getObject,
    getSubstance,
    getTool,
    getRecordByNameAndType
}