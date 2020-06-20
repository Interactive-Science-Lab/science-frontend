import React from 'react'
import Component from '../component'
import { PermissionSetting } from '../permission'

let component = new Component('substance') 
let noIndex = new PermissionSetting('noIndex')

component.setFieldOption('uniqueField', 'display_name')

component.addField('display_name', { validations: ["unique", 'required'], titleField: true } )
component.addField('description')
component.addField('scientific_name')

component.addField('texture', {fieldType: "string", permissions: noIndex })
component.addField('color', {fieldType: "string", permissions: noIndex })
component.addField('container', {fieldType: "string", permissions: noIndex })

component.addField('properties', {fieldType: "array", permissions: noIndex })

component.addField('density', {fieldType: "number", suffix: "g/mL", label: true, permissions: noIndex })
component.addField('ph', {fieldType: "number", label: true, permissions: noIndex })
component.addField('temperature', {fieldType: "number", label: true, permissions: noIndex })
component.addField('low_temp_point', {fieldType: "number", label: true, permissions: noIndex })
component.addField('high_temp_point', {fieldType: "number", label: true, permissions: noIndex })


component.addMenuOption({name: "Substances", category: 1, view: 'admin', symbol: 'heart', order: 3})

export default component


