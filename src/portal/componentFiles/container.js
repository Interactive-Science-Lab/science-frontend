import React from 'react'
import Component from '../asteroid/componentClass/component'
import { PermissionSetting } from '../asteroid/permission'

let component = new Component('container') 
let noIndex = new PermissionSetting('noIndex')
let hidden = new PermissionSetting('hidden')

component.setFieldOption('uniqueField', 'display_name')
component.addFeature('search')

component.addField('display_name', { validations: ["unique", 'required'], titleField: true } )
component.addField('description')

component.addField('mass', {formInfo: "In g.", fieldType: "number", suffix: "g", label: true, permissions: noIndex })
component.addField('hold_volume', {formInfo: "The max amount of volume the container can hold.", label: true, fieldType: "number", suffix: "mL", label: true, permissions: noIndex })

component.addField('sprite', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "string", permissions: hidden })
component.addField('properties', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "array", permissions: hidden })

component.addMenuOption({name: "Containers", category: "Lab Settings", permission:  'admin', symbol: 'heart', order: 4})

component.changeText('indexText', <div>This is a list of all "Containers"- these items can hold both Objects & Substances and be used in combination with Tools.</div>)
component.changeText('editText', <div>You can edit all fields for each container here. Not all fields are used for all containers, not all fields are required.</div>)




export default component
