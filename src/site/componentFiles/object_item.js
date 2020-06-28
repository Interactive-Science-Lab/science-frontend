import React from 'react'
import Component from '../../main/asteroid/componentClass/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('object_item', {friendly: 'objects', upper: 'Object'}) 
let noIndex = new PermissionSetting('noIndex')
let hidden = new PermissionSetting('hidden')

component.setFieldOption('uniqueField', 'display_name')

component.addFeature('search')


component.addField('display_name', { validations: ["unique", 'required'], titleField: true } )
component.addField('description')


component.addField('mass', {formInfo: "In grams", fieldType: "number", suffix: "g", label: true, permissions: noIndex })
component.addField('volume', {formInfo: "In mL", fieldType: "number", suffix: "mL", label: true, permissions: noIndex })
component.addField('ph', {formInfo: "", fieldType: "number", label: true, permissions: noIndex })
component.addField('temperature', {formInfo: "The temperature of the substance when it comes out of a drawer or container.", fieldType: "number", suffix: "C", label: true, permissions: noIndex })
component.addField('low_temp_point', {formInfo: "The temperature where the substance goes from solid to liquid", fieldType: "number", suffix: "C", label: true, permissions: noIndex })
component.addField('high_temp_point', {formInfo: "The temperature where the substance goes from liquid to gas and back.", fieldType: "number", suffix: "C", label: true, permissions: noIndex })

component.addField('sprite', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "string", permissions: hidden })
component.addField('color', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "string", label: true, permissions: hidden })

component.addField('properties', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "array", permissions: hidden})



component.addMenuOption({name: "Objects", category: "Lab Settings", permission:  'admin', symbol: 'heart', order: 2})

component.changeText('indexText', <div>This is a list of all "Objects"- simple items that aren't "Containers" or "Tools". </div>)
component.changeText('editText', <div>You can edit all fields for each object here. Not all fields are used for all objects, not all fields are required.</div>)

export default component

