import React from 'react'
import Component from '../../main/asteroid/componentClass/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('substance') 
let noIndex = new PermissionSetting('noIndex')
let hidden = new PermissionSetting('hidden')

component.setFieldOption('uniqueField', 'display_name')
component.addFeature('search')

component.addField('display_name', { validations: ["unique", 'required'], titleField: true } )
component.addField('description')

component.addField('density', {formInfo: "In g/mL", fieldType: "number", suffix: "g/mL", label: true, permissions: noIndex })
component.addField('ph', {fieldType: "number", label: true, permissions: noIndex })
component.addField('temperature', {formInfo: "The temperature of the substance when it comes out of a drawer or container.", fieldType: "number", label: true, permissions: noIndex })
component.addField('low_temp_point', {formInfo: "The temperature where the substance goes from solid to liquid", fieldType: "number", label: true, permissions: noIndex })
component.addField('high_temp_point', {formInfo: "The temperature where the substance goes from liquid to gas and back.", fieldType: "number", label: true, permissions: noIndex })


component.addField('texture', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "string", permissions: hidden })
component.addField('color', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "string", permissions: hidden })
component.addField('container', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "string", permissions: hidden })

component.addField('properties', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "array", permissions: hidden })

component.addMenuOption({name: "Substances", category: "Lab Settings", permission:  'admin', symbol: 'heart', order: 3})

component.changeText('indexText', <div>This is a list of all "Substances"- these items "come in a container", and certain Tools are used to "get them out." </div>)
component.changeText('editText', <div>You can edit all fields for each substance here. Not all fields are used for all substances, not all fields are required.</div>)


export default component


