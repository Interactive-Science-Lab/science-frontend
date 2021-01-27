import Component from '../asteroid/componentClass/component'
import { PermissionSetting } from '../asteroid/permission'

let component = new Component('user') 

let pS = new PermissionSetting('admin')

component.setPermissions(pS)

component.addFeature('search')
component.addFeature('paginate')

component.addFeature('filter', ['all', '1', '2', '3'])

component.addFeature("userInfo")

component.setFieldOption('selfId', 'user_id')

component.addMenuOption({name: "Manage User Accounts", permission:  'admin', symbol: 'heart', order: 3, category: "Admin"})


let thumb = component.addReference('end_user_id', 'info', 'control', {title: "Account Info", resourceName: 'end_users'})

let privateField = new PermissionSetting('private').modifyPermissions('noIndex')
let hidden = new PermissionSetting('hidden')
let autoStatic = new PermissionSetting('static')
autoStatic.modifyPermissions('auto')
let secret = new PermissionSetting('secret')

component.addField('username', {validations: ['unique', 'required'], label: true})
component.addField('user_email', {formInfo: "If you are creating a student account, make up an email. It just needs to be unique.", validations: ['unique', 'required'], permissions: privateField})
component.addField('password', {fieldType: 'password', permissions: hidden, label: true})
//component.addField('ban_notes', {fieldType: 'text', permissions: mod})
component.addField('mailing_list', {default: true, fieldType: 'boolean', permissions: secret})
component.addField('user_role', {default: 1, fieldType: 'number', permissions: secret })
component.addField('user_verified', {default: true, permissions: secret })
let uk = component.addField('user_kind', {default: 'end_user', permissions: autoStatic })

let customDisplay = (item) => {
    return item.user_kind === 'end_user' ? "[Student Account]" : "[Admin Account]"
}
uk.setCustomDisplay('display', customDisplay)

export default component

//feature - user_info