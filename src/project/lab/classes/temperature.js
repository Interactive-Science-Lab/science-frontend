

function calculateChange(component, itemArr) {
    let totalTemp = 0
    let totalMass = 0
    let mathArr = []
    itemArr.map(itemObj => {
        let record = MasterListHelper.getRecord(component.state.masterItemList, itemObj.itemType, itemObj)
        let mass = itemObj.mass || record.mass
        let temperature = itemObj.temperature || record.temperature || 70
        if (record.density) {
            let volume = itemObj.volume || record.volume
            mass = record.density * volume
        }
        totalMass += mass
        mathArr.push({ mass, temperature })
    })
    mathArr.map((entry) => {
        totalTemp += (entry.mass / totalMass) * entry.temperature
    })

    return totalTemp
}

function heatItem(component, event) {
    let { itemsState } = component.state
    let burner = ClassHelpers.get_instance_by_event(itemsState, event)

    itemsState = itemsState.filter(obj => obj.instance !== burner.instance)

    let heatedItem = burner.usedItem

    const cList = event.target.classList
    const tempIncrease = heatedItem.temperature + (cList.contains('heat-hi') ? 100 : (
        cList.contains('heat-mid') ? 50 : (
            25
        )
    ))
    if(heatedItem.itemType === 'containers') {
        heatedItem = ContainerHelper.updateContainerTemperature(heatedItem, tempIncrease)    
    }


    burner.usedItem = heatedItem
    itemsState.push(burner)

    component.setState({ itemsState })
}




export default {
    calculateChange,
    heatItem
}