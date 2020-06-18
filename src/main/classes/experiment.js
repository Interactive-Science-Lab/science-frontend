import Component from '../main/component'
import { PermissionSetting } from '../main/permission'

let component = new Component('experiment') 
let noIndex = new PermissionSetting('noIndex')

component.addField('experiment_name', { validations: ["unique", 'required'], titleField: true } )
component.addField('experiment_description')
component.addField('experiment_information')

component.addField('experiment_steps', {fieldType: "text", label: true, permissions: noIndex })
component.addField('experiment_start', {fieldType: "object", label: true, permissions: noIndex })

export default component



