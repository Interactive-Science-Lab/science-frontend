import Component from '../../main/asteroid/componentClass/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('container') 
let noIndex = new PermissionSetting('noIndex')

component.setFieldOption('uniqueField', 'display_name')

component.addField('display_name', { validations: ["unique", 'required'], titleField: true } )
component.addField('description')

component.addField('mass', {fieldType: "number", suffix: "g", label: true, permissions: noIndex })
component.addField('hold_volume', {fieldType: "number", suffix: "mL", label: true, permissions: noIndex })
component.addField('properties', {fieldType: "array", permissions: noIndex })
component.addField('sprite', {fieldType: "string", permissions: noIndex })

component.addMenuOption({name: "Containers", category: "Lab Settings", permission:  'admin', symbol: 'heart', order: 4})

export default component
