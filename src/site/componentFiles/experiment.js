import Component from '../../main/asteroid/component'
import { PermissionSetting } from '../../main/asteroid/permission'

let component = new Component('experiment') 
let noIndex = new PermissionSetting('noIndex')

component.addField('experiment_name', { validations: ["unique", 'required'], titleField: true, formInfo: "The name of the experiment as it displays in the list." } )

component.addField('experiment_description', {formInfo: "A short one-liner to quick desribe the experiment."})
component.addField('experiment_information', {formInfo: "Any background information about the experiment in general you wanted to display."})

component.addField('experiment_steps', {fieldType: "text", label: true, permissions: noIndex, formInfo: "The actual steps of the experiment as shown to the user. Split up steps with the format '#x.' and that will start a new line." })
component.addField('experiment_start', {fieldType: "object", label: true, permissions: noIndex, formInfo: "What each experiment starts with. This needs to be technical information, so I highly reccomend NOT to edit." })

component.addMenuOption({name: "Experiments", category: 1, view: 'admin', symbol: 'heart', order: 1})



export default component



