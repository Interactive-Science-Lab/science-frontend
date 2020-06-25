import Component from '../../main/asteroid/componentClass/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('site_page', {friendly: 'pages', upper: 'Page'}) 

/* PERMISSIONS */
let pagePermissions = new PermissionSetting('content')
pagePermissions.setPermission('index', 'mod')
let hiddenPermissions = new PermissionSetting('hidden')
component.setPermissions(pagePermissions)
let filterPermissions = new PermissionSetting('admin')

/* FEATURES */
component.addFeature('search')
component.addFeature('paginate')

component.addFeature('filter', ['draft', 'public', 'private'], filterPermissions)
component.addFeature('sort', [['page_title', 'Alphabetical'], ['page_order', 'Order'], ['page_category', 'Category']])

component.setLoader({ filter: 'public' })

/* MENU */
component.addMenuOption({name: "Edit Pages", view: 'admin', symbol: 'heart', order: 10, category: "Admin"})

/* FIELDS */
component.addField('page_status', {default: 'draft', fieldType: ["select-draft"] })
component.addField('page_category', {permissions: hiddenPermissions})
component.addField('page_symbol', {default: 'star', fieldType: 'icon'})
component.addField('page_title', {validations: ['unique', 'required'], titleField: true})
component.addField('page_body_text', {fieldType: "html", validations: ['required']})
component.addField('page_order', {default: 0, fieldType: 'number', validations: ['required'], permissions: hiddenPermissions})

/* DISPLAY */
component.changeText('viewTitle', '')

export default component
