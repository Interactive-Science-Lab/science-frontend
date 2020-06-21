import { ItemInstance } from './core'
import { ContainerInstance } from './containers'
import { ToolInstance } from './tools'
import { SubstanceInstance } from './substances'

export class ItemsState {
    constructor() {
        this.list = [] //An array of ItemInstances
        this.maxSize = 128
        this.nextId = 1
    }

    //Record is the record from the master list.
    //Instance info is only required to itemType.
    //Hoverpos is an {area, pos} object.
    newInstance = (record, instanceInfo, hoverPos) => {
        var newInstance;
        if(instanceInfo.options){
            if(instanceInfo.options === 'frozen') {
                record = {...record, temperature: -5}
            }
        }
        switch (instanceInfo.itemType) {
            case "containers":
                newInstance = new ContainerInstance(record, instanceInfo, hoverPos, Number.parseInt(this.nextId) )
                break;
            case "tools":
                newInstance = new ToolInstance(record, instanceInfo, hoverPos, Number.parseInt(this.nextId) )
                break;
            case "substances":
                newInstance = new SubstanceInstance(record, instanceInfo, hoverPos, Number.parseInt(this.nextId) )
                break;
            default:
                newInstance = new ItemInstance(record, instanceInfo, hoverPos, Number.parseInt(this.nextId) )
                break;
        }
        this.nextId += 1
        this.list.push(newInstance)
        return newInstance
    }

    duplicate = (instance) => {
        const dup = this.newInstance(instance.record, {itemType: instance.itemType}, {})
        return dup
    }

    getInstance = (id) => {
        let ret = {}
        this.list.forEach(inst => inst.instance_id === Number.parseInt(id) ? ret = inst : null)
        return ret
    }

    getInstanceByEvent = (e) => {
        return this.getInstance(this.getIdFromEvent(e))
    }

    getInstanceByDrag = (dragItem) => {
        return this.getInstance(dragItem.instance)
    }

    updateInstance = (instance) => {
        let oldInstance = this.getInstance(instance.instance_id)
        this.removeItem(instance.instance_id)
        this.list.push(instance)
        return this
    }
    updateState = (component) => {
        component.setState({ itemsState: this })
    }
    updateInstanceAndState = (instance, component) => {
        this.updateInstance(instance)
        this.updateState(component)
    }

    removeItem = (instance_id) => {
        let instance = this.getInstance(instance_id)
        if(instance.usedItem){
            this.removeItem(instance.usedItem.instance_id)
        }
        this.list = this.list.filter(i => i.instance_id !== instance_id)
    }

    removeItemByEvent = (e, component) => {
        const iId = this.getIdFromEvent(e)
        this.removeItem(iId)
        this.updateState(component)
    }

    getIdFromEvent = (e) => {
        return Number.parseInt(e.target.getAttribute('data-instance'))
    }



    checkPosition = ({ pos, area }) => {
        let posFree = (pos || pos === 0) && area
        this.list.map(item => item.pos === pos && item.area === area ? posFree = false : null)
        return posFree
    }

    getSinkObject = () => {
        let updateObj = {}
        this.list.map(obj => 4 === obj.area && 0 === obj.pos ? updateObj = obj : null)
        return updateObj
    }



}


