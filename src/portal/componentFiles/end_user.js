import Component from '../asteroid/componentClass/component'
import { PermissionSetting } from '../asteroid/permission'

let component = new Component('end_user')
let pS = new PermissionSetting('all')

component.setPermissions(pS)

component.addField('user_link', {label: true, fieldType: ['select-custom', [['chemistry', "Chemistry"], ['biology', "Biology"], ['physics', "Physics"]]]})

component.changeText('viewTitle', false)

export default component