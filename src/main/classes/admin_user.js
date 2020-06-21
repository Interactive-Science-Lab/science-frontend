import Component from '../component'
import { PermissionSetting } from '../permission'

let component = new Component('admin_user')
let pS = new PermissionSetting('all')

component.setPermissions(pS)
component.setName('friendly', 'admin_user')
component.addOption('override_api_path', "/users/auth/edit/info")

component.addField('public-email', {})
component.addField('public-phone', {})

export default component