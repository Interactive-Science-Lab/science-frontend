import React from 'react'
import Component from '../asteroid/componentClass/component'
import { PermissionSetting } from '../asteroid/permission'

let component = new Component('experiment') 
let noIndex = new PermissionSetting('noIndex')

component.addFeature('filter', ['all', 'biology', 'chemistry', 'physics'])
component.addFeature('search')

component.addField('experiment_name', { validations: ["unique", 'required'], titleField: true, formInfo: "The name of the experiment as it displays in the list." } )

component.addField('experiment_class', {formInfo: "Which 'class' this experiment belongs to", fieldType: ['select-custom', [['chemistry', 'Chemistry'], ['biology', 'Biology'], ['physics', 'Physics']]] })

component.addField('experiment_description', {formInfo: "A short one-liner to quick desribe the experiment."})
component.addField('experiment_information', {formInfo: "Any background information about the experiment in general you wanted to display, related to background understanding or formulas, etc.", label: true, permissions: noIndex})

component.addField('experiment_steps', {fieldType: "text", label: true, permissions: noIndex, formInfo: "The actual steps of the experiment as shown to the user. Split up steps with the format '#x.' and that will start a new line." })
//component.addField('experiment_start', {fieldType: "object", label: true, permissions: noIndex, formInfo: "What each experiment starts with. This needs to be technical information, so I highly reccomend NOT to edit." })

component.addMenuOption({name: "Experiments", category:  "Lab Settings", permission:  'admin', symbol: 'heart', order: 1})

component.changeText('indexText', <div>Here is a list of all experiments. They are able to be filtered by the 'class' type, and you can search by name.<br />Click on one to see more information and to edit the field.</div>)

export default component



