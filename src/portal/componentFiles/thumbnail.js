import Component from '../asteroid/componentClass/component'
import { PermissionSetting } from '../asteroid/permission'

let component = new Component('thumbnail')
let pS = new PermissionSetting('all')

let autoStatic = new PermissionSetting('auto').modifyPermissions('static')

component.setPermissions(pS)
component.setName("urlPath", '/images')
component.setFieldOption('idField', 'image_id')

component.addField('image_url', {fieldType: "image"})
component.addField('image_kind', {default: 'thumbnail', permissions: autoStatic})
component.addField('image_title', {})
component.addField('image_description', {})
component.addField('image_source', {})


export default component
