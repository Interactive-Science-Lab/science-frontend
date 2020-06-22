import {PermissionSetting} from './permission'


//Paginate, search, sort, filter

export default class ComponentFeature {
    constructor(name, options = null, permissions = null) {
        this.name = name
        this.options = options 
        this.permissions = permissions || new PermissionSetting()
    }
}