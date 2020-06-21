import Component from '../../main/asteroid/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('user') 

let pS = new PermissionSetting('personal-content')
pS.modifyPermissions('modIndex')

component.setPermissions(pS)

component.turnOnFeature('search')
component.turnOnFeature('paginate')
component.turnOnFeature('filter')
component.turnOnFeature("userInfo")
component.setFilterOptions(['all', '1', '2', '3'])
component.setFieldOption('selfId', 'user_id')

component.addMenuOption({name: "Users", view: 'admin', symbol: 'heart', order: 3, category: 3})


let privateField = new PermissionSetting('private').modifyPermissions('noIndex')
let pHField = new PermissionSetting('private').modifyPermissions('hidden')
let mod = new PermissionSetting('mod')
let autoStatic = new PermissionSetting('static')
autoStatic.modifyPermissions('auto')
let adminEdit = new PermissionSetting('auto')
adminEdit.setPermission('edit', 'admin')

component.addField('username', {validations: ['unique', 'required']})
component.addField('user_email', {validations: ['unique', 'required'], permissions: privateField})
component.addField('password', {validations: ['required'], permissions: pHField })
component.addField('ban_notes', {fieldType: 'text', permissions: mod})
component.addField('mailing_list', {default: true, fieldType: 'boolean', permissions: privateField})
component.addField('user_role', {default: 1, fieldType: 'number', permissions: adminEdit })
component.addField('user_kind', {permissions: autoStatic })

export default component

//feature - user_info
