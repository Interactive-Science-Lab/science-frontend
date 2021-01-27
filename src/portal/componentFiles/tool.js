import React from 'react'
import Component from '../asteroid/componentClass/component'
import { PermissionSetting } from '../asteroid/permission'

let component = new Component('tool') 
let noIndex = new PermissionSetting('noIndex')
let hidden = new PermissionSetting('hidden')

component.setFieldOption('uniqueField', 'display_name')

component.addField('display_name', { validations: ["unique", 'required'], titleField: true } )
component.addField('description', {fieldInfo: "This is a quick description of WHAT the item is"})
component.addField('instructions', {fieldInfo: "These are the instructions on HOW to USE the item in this app", permissions: noIndex})
component.addField('sprite', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "string", permissions: hidden })
component.addField('properties', {formInfo: "DEVELOPER FIELD", label: true, fieldType: "array", permissions: hidden })

component.addMenuOption({name: "Tools", category: "Lab Settings", permission:  'admin', symbol: 'heart', order: 5})

component.changeText('indexText', <div>This is a list of all "Tools"- these items can interact with all of the other types of items. Some display readings, some change the state of the contents.</div>)
component.changeText('editText', <div>You can edit all fields for each tool here.</div>)

export default component




