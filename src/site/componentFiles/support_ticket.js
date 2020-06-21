import Component from '../../main/asteroid/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('support_ticket', {friendly: 'support_tickets', upper: 'SupportTicket'}) 

let submit = new PermissionSetting('submit-content')
let staticSubmit = new PermissionSetting('static-submit')
let content = new PermissionSetting('content')
let mod = new PermissionSetting('mod')
let auto = new PermissionSetting('auto')

component.setPermissions(submit)

component.turnOnFeature('search')
component.turnOnFeature('paginate')
component.turnOnFeature('filter')
component.setFilterOptions(['all', 'pending', 'open', 'closed'])
component.setLoader({ sort: "created_at", sortdir: "DESC" })

component.addMenuOption({name: "Get Help", view: 'all', symbol: 'heart', order: 2, category: 2, path: "/new"})
component.addMenuOption({name: "See Support Ticket", view: 'admin', symbol: 'heart', order: 2, category: 3})

component.addField('support_ticket_kind', {default: 1, fieldType: ["select-custom", [['error', "Account Error"], ['bug', "Bug Encountered"], ["general", "General Issue"]] ] })
component.addField('support_ticket_message', {fieldType: "text", label: true})
component.addField('support_ticket_name', {permissions: staticSubmit})
component.addField('support_ticket_email', {permissions: staticSubmit})
component.addField('require_update', {default: true, fieldType: "boolean", label: true, permissions: staticSubmit})
component.addField('support_ticket_state', {default: 'pending', fieldType: ["select-open"], label: true, permissions: auto})
component.addField('public_notes_text', {fieldType: "text", label: true, permissions: content.modifyPermissions('noIndex').modifyPermissions('auto')})
component.addField('private_notes_text', {fieldType: "text", label: true, permissions: mod.modifyPermissions('noIndex').modifyPermissions('auto')})

export default component
