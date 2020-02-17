import React from 'react'
import {Link} from 'react-router-dom'

const base = 'feedback'

const permissions = {
    index: {
        name: "all"
    },
    view: {
        name: "all"
    },
    new: {
        name: "mod"
    },
    edit: {
        name: "mod"
    },
    delete: {
        name: "mod"
    },
}


const features = {
    filter: {
        options: ['unlogged', 'logged'],
        protection: "admin",
    },
    search: {},
    paginate: {},
}

const fields = {
    feedback_kind: {default: "", fieldType: ['select-custom-int', ['Comment', 'Question', 'Concern']], permissions: {edit: {name: 'none'}}, label: true},
    feedback_message: {default: "", fieldType: 'text', permissions: {edit: {name: 'none'}}, label: true },
    feedback_name: {default: "", fieldType: 'string', permissions: {edit: {name: 'none'}}, label: true },
    feedback_email: {default: "", fieldType: 'string', permissions: {edit: {name: 'none'}}, label: true },
    logged: {default: false, fieldType: 'boolean', permissions: {new: {name: 'none'}} }
}

const plural = base + 's'
const friendly = 'feedback' || plural //override null here in specific cases. Try to avoid this for simplicity reasons, but this is where you can assign a site_blog to direct to blogs 
const upper = base.charAt(0).toUpperCase() + base.substring(1);
const pluralUpper = upper + 's'

const loader = {}

export default  {
    name: {
        lp: plural,
        ls: base,
        up: pluralUpper,
        us: upper,
        friendly,
        urlPath: "/" + base,
        folderPath: "/" + plural,
        title: {
            index: "All " + pluralUpper,
            view: upper + " Details",
            new: "Add " + upper,
            edit: "Edit " + upper
        },
    },
    permissions,
    features,
    loader,
    idField: base + '_id',
    uniqueText: base + '_name',
    fields,
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




