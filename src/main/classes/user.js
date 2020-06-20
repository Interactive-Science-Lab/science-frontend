import Component from '../component'
import { PermissionSetting } from '../permission'

let component = new Component('user') 

let pS = new PermissionSetting('personal-content')
pS.modifyPermissions('modIndex')

component.setPermissions(pS)

component.turnOnFeature('search')
component.turnOnFeature('paginate')
component.turnOnFeature('thumbnail')
component.turnOnFeature('filter')
component.setFilterOptions(['all', '1', '2', '3'])
component.setLoader({ sort: "created_at", sortdir: "DESC" })

component.addMenuOption({name: "Users", view: 'admin', symbol: 'heart', order: 3, category: 3})


let privateField = new PermissionSetting('private')
let mod = new PermissionSetting('mod')
let autoStatic = new PermissionSetting('static')
autoStatic.modifyPermissions('auto')
let adminEdit = new PermissionSetting('auto')
adminEdit.setPermission('edit', 'admin')

component.addField('username', {validations: ['unique', 'required']})
component.addField('user_email', {validations: ['unique', 'required'], permissions: privateField})
component.addField('password', {validations: ['required'], permissions: privateField.modifyPermissions('hidden') })
component.addField('ban_notes', {fieldType: 'text', permissions: mod})
component.addField('mailing_list', {default: true, fieldType: 'boolean', permissions: privateField})
component.addField('user_role', {default: 1, fieldType: 'number', permissions: adminEdit })
component.addField('user_kind', {permissions: autoStatic })
component.addField('user_verified', {fieldType: "hidden"})
component.addField('last_login_attempt', {fieldType: "hidden"})
component.addField('login_attempts', {fieldType: "hidden"})
component.addField('forgotten_password_reset_time', {fieldType: "hidden"})


export default component

//feature - user_info
