import Component from '../component'
import { PermissionSetting } from '../permission'

let component = new Component('experiment') 
let noIndex = new PermissionSetting('noIndex')

component.addField('experiment_name', { validations: ["unique", 'required'], titleField: true } )

component.addField('experiment_description')
component.addField('experiment_information')

component.addField('experiment_steps', {fieldType: "text", label: true, permissions: noIndex })
component.addField('experiment_start', {fieldType: "object", label: true, permissions: noIndex })

component.addMenuOption({name: "Experiments", category: 1, view: 'admin', symbol: 'heart', order: 1})



export default component



