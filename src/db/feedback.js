import React from 'react'
import {Link} from 'react-router-dom'

export default {
    name: {
        lp: "feedbacks",
        ls: "feedback",
        up: "Feedbacks",
        us: "Feedback",
        urlPath: "/feedback",
        folderPath: "/core/admin",
        index_title: "Feedback",
        view_title: "User Profile",
        new_title: "Submit Feedback"
    },
    permissions: {
        index: "mod",
        view: "mod",
        create: "all",
        edit: "mod"
    },
    features: {
        resource: {
            urlPath: '/feedback',
            title: "Provided Feedback",
        },
        filter: {
            options: ['unlogged', 'logged'],
            protection: "admin",
        },
        search: {},
        paginate: {},
    },
    loader: {filter: '', sort: "created_at", sortdir: "DESC"},
    idField: 'feedback_id',
    fields: {
        feedback_kind: {default: "", fieldType: ['select-custom-int', ['Comment', 'Question', 'Concern']], permissions: ['static'], label: true},
        feedback_message: {default: "", fieldType: 'text', permissions: ['static'], label: true },
        feedback_name: {default: "", fieldType: 'string', permissions: ['static'], label: true },
        feedback_email: {default: "", fieldType: 'string', permissions: ['static'], label: true },
        logged: {default: false, fieldType: 'boolean', permissions: ['auto'] }
    },
    display: {
        list: (item) => {
            const from = item.feedback_name || item.feedback_email ?  `${item.feedback_name} ${item.feedback_email}` : "Anonymous"
            return <Link style={{display:'block'}} to={`feedback/${item.feedback_id}`}>
                {from} said:<br /> 
                <i>{item.feedback_message}</i><br />
                {item.logged ? "Logged" : "Unlogged"}
            </Link>
        }, 
        page: (item) => {
            const from = item.feedback_name || item.feedback_email ?  `${item.feedback_name} ${item.feedback_email}` : "Anonymous"
            return <div style={{display:'block'}} to={`feedback/${item.feedback_id}`}>
                {from} said:<br /> 
                <i>{item.feedback_message}</i><br />
                {item.logged ? "Logged" : "Unlogged"}
            </div>
        }
    },
    options: {
        submit_message: () => { return <div>Thank You! Your feedback has been recieved.</div> }
    }
}