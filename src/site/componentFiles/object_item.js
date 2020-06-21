import Component from '../../main/asteroid/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('object_item', {friendly: 'objects', upper: 'Object'}) 
let noIndex = new PermissionSetting('noIndex')

component.setFieldOption('uniqueField', 'display_name')


component.addField('display_name', { validations: ["unique", 'required'], titleField: true } )
component.addField('description')
component.addField('scientific_name')

component.addField('sprite', {fieldType: "string", permissions: noIndex })
component.addField('color', {fieldType: "string", permissions: noIndex })

component.addField('properties', {fieldType: "array", permissions: noIndex, label: true })

component.addField('mass', {fieldType: "number", suffix: "g", label: true, permissions: noIndex })
component.addField('volume', {fieldType: "number", suffix: "mL", label: true, permissions: noIndex })
component.addField('ph', {fieldType: "number", label: true, permissions: noIndex })
component.addField('temperature', {fieldType: "number", label: true, permissions: noIndex })
component.addField('low_temp_point', {fieldType: "number", label: true, permissions: noIndex })
component.addField('high_temp_point', {fieldType: "number", label: true, permissions: noIndex })


component.addMenuOption({name: "Objects", category: 1, view: 'admin', symbol: 'heart', order: 2})

export default component

