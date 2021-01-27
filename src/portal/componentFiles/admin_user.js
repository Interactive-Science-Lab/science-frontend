import Component from '../asteroid/componentClass/component'
import { PermissionSetting } from '../asteroid/permission'

let component = new Component('admin_user')
let pS = new PermissionSetting('all')

component.setPermissions(pS)

component.addField('public-email', {})
component.addField('public-phone', {})

export default component