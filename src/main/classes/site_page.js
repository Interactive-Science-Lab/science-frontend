import Component from '../component'
import { PermissionSetting } from '../permission'

let component = new Component('site_page', {friendly: 'pages', upper: 'Page'}) 

/* PERMISSIONS */
let pagePermissions = new PermissionSetting('content')
pagePermissions.setPermission('index', 'mod')
let hiddenPermissions = new PermissionSetting('hidden')
component.setPermissions(pagePermissions)

/* FEATURES */
component.turnOnFeature('search')
component.turnOnFeature('paginate')
component.turnOnFeature('filter')
component.setFilterOptions(['draft', 'public', 'private'])
let filterPermissions = new PermissionSetting('admin')
component.setFilterPermissions(filterPermissions)

component.turnOnFeature('sort')
component.addSortOption('page_title', 'Alphabetical')
component.addSortOption('page_category', 'Category')
component.addSortOption('page_order', 'Order')

component.setLoader({ filter: 'public' })

/* MENU */
component.addMenuOption({name: "Site Pages", view: 'admin', symbol: 'heart', order: 0})

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
