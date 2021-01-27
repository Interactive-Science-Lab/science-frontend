import Component from '../asteroid/componentClass/component'
import { PermissionSetting } from '../asteroid/permission'

let component = new Component('log')

let pS = new PermissionSetting('mod')
pS.setPermission('new', 'none')

let staticField = new PermissionSetting('static')
let staticAuto = new PermissionSetting('static')
staticAuto = staticAuto.modifyPermissions('auto')
let staticInfo = new PermissionSetting('static')
staticInfo = staticInfo.modifyPermissions('noIndex')
let noIndex = new PermissionSetting('noIndex')


component.setPermissions(pS)

component.turnOnFeature('search')
component.turnOnFeature('paginate')
component.turnOnFeature('filter')
component.setFilterOptions(['all', 'confirmed', 'unconfirmed'])


component.setLoader({ filter: 'unconfirmed' })


component.turnOnFeature('userReference')
component.addUserReference("log_submitting_user_id", {permissions: staticAuto, title: "Submitter", targetField: 'log_submitting_user_id' })
component.addUserReference("log_confirming_user_id", {permissions: staticAuto, title: "Admin", targetField: 'log_confirming_user_id' })


component.addField('route', {permissions: staticField})
component.addField('method', {permissions: staticField})
component.addField('changes', {fieldType: "object", permissions: staticInfo, label: true})
component.addField('previous', {fieldType: "object", permissions: staticInfo, label: true})
component.addField('object_id', {fieldType: "reference", permissions: staticField, label: true})
component.addField('notes', {fieldType: "text", label: true, permissions: noIndex})
component.addField('log_confirmed', {fieldType: 'boolean', default: false, label: true, permissions: noIndex})

export default component