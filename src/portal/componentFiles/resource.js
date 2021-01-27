import React from 'react'
import Component from '../asteroid/componentClass/component'
import { PermissionSetting } from '../asteroid/permission'

let component = new Component('resource')

component.setFieldOption('uniqueField', 'base_name')

component.addField('base_name', { fieldType: 'string', label: true })
component.addField('idField', { fieldType: 'string', label: true })
component.addField('nameField', { fieldType: 'string', label: true })

component.addField('names', { fieldType: 'object', label: true })
component.addField('special_fields', { fieldType: 'object' , label: true})

component.addField('text', { fieldType: 'object', label: true })
component.addField('loader', { fieldType: 'object', label: true })
component.addField('options', { fieldType: 'object', label: true })
component.addField('actionRedirects', { fieldType: 'object', label: true })
component.addField('actionOptions', { fieldType: 'object', label: true })


component.addMenuOption({name: "Resources", category: "Lab Settings", permission:  'admin', symbol: 'heart', order: 5})


export default component




