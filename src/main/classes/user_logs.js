import Component from '../component'
import { PermissionSetting } from '../permission'

let component = new Component('log')

let pS = new PermissionSetting('mod')
pS.setPermission('new', 'none')

let staticField = new PermissionSetting('static')

component.setPermissions(pS)

component.turnOnFeature('search')
component.turnOnFeature('paginate')
component.turnOnFeature('filter')
component.setFilterOptions(['all', 'confirmed', 'unconfirmed'])
component.setLoader({ filter: 'unlogged' })

component.addMenuOption({ name: "Logs", view: 'admin', symbol: 'heart', category: 3, order: 3 })

component.addField('route', {permission: staticField})
component.addField('method', {permission: staticField})
component.addField('changes', {fieldType: "object", permission: staticField})
component.addField('previous', {fieldType: "object", permission: staticField})
component.addField('object_id', {fieldType: "reference", permission: staticField})
component.addField('notes', {fieldType: "text"})
component.addField('log_confirmed', {})

export default component

// features: {
//     resource: {
//         urlPath: '/logs',
//             title: "Logs",
//         },
//     user: [
//         { field: "log_submitting_user_id", name: "Submitting User", permissions: ["static"] },
//         { field: "log_confirming_user_id", name: "Confirming User", permissions: ["static"] },
//     ]
// },
