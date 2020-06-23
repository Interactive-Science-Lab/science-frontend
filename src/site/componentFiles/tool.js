import Component from '../../main/asteroid/componentClass/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('tool') 
let noIndex = new PermissionSetting('noIndex')

component.setFieldOption('uniqueField', 'display_name')

component.addField('display_name', { validations: ["unique", 'required'], titleField: true } )
component.addField('description')
component.addField('instructions')
component.addField('sprite', {fieldType: "string", permissions: noIndex })
component.addField('properties', {fieldType: "array", permissions: noIndex })

component.addMenuOption({name: "Tools", category: "Lab Settings", permission:  'admin', symbol: 'heart', order: 5})

export default component




