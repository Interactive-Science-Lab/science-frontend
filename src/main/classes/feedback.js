import React from 'react'
import {Link} from 'react-router-dom'


import Component from '../component'
import { PermissionSetting } from '../permission'

let component = new Component('feedback', {friendly: 'feedback', urlPath: '/feedback'}) 

let staticSubmit = new PermissionSetting('static-submit')
let auto = new PermissionSetting('auto')

component.setPermissions(staticSubmit)

component.turnOnFeature('search')
component.turnOnFeature('paginate')
component.turnOnFeature('filter')
component.setFilterOptions(['logged', 'unlogged'])
component.setLoader({filter: 'unlogged'})

component.addMenuOption({name: "See Feedback", category: 3, view: 'admin', symbol: 'heart', order: 1})
component.addMenuOption({name: "Submit Feedback", category: 2, view: 'all', symbol: 'heart', order: 1, path: "/new"})

const list = (item) => {
    const from = item.feedback_name || item.feedback_email ?  `${item.feedback_name} ${item.feedback_email}` : "Anonymous"
    return <Link style={{display:'block'}} to={`feedback/${item.feedback_id}`}>
        {from} said:<br /> 
        <i>{item.feedback_message}</i><br />
        {item.logged ? "Logged" : "Unlogged"}
    </Link>
}
const page = (item) => {
    const from = item.feedback_name || item.feedback_email ?  `${item.feedback_name} ${item.feedback_email}` : "Anonymous"
    return <div style={{display:'block'}} to={`feedback/${item.feedback_id}`}>
        {from} said:<br /> 
        <i>{item.feedback_message}</i><br />
        {item.logged ? "Logged" : "Unlogged"}
    </div>
}
const submit_message = (item) => { return <div>Thank You! Your feedback has been recieved.</div> }

component.setCustomDisplay('listItem', list)
//component.setCustomDisplay('view', page)
component.addOption('submit_message', submit_message)

component.addField('feedback_kind', {default: 1, fieldType: ['select-custom', [[1, 'Comment'], [2, 'Question'], [3, 'Concern']] ] })
component.addField('feedback_message', {fieldType: "text", label: true})
component.addField('feedback_name', {label: true})
component.addField('feedback_email', {label: true})
component.addField('logged', {default: false, fieldType: "boolean", label: true, permissions: auto})

export default component

    




