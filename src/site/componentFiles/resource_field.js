import React from 'react'
import Component from '../../main/asteroid/componentClass/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('resource_field')

component.addField('parent_id', { fieldType: 'number', label: true })
component.addField('name', { fieldType: 'string', label: true })
component.addField('label', { fieldType: 'string', label: true })

component.addField('category', { fieldType: 'string', label: true })
component.addField('order', { fieldType: 'number' , label: true})


component.addField('displayType', { fieldType: 'string', label: true })
component.addField('displayName', { fieldType: 'string', label: true })

component.addField('text', { fieldType: 'object', label: true })
component.addField('validations', { fieldType: 'array', label: true })
component.addField('info', { fieldType: 'object', label: true })



component.addMenuOption({name: "Resource Fields", category: "Lab Settings", permission:  'admin', symbol: 'heart', order: 5})


export default component




