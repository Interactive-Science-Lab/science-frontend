import user from './user'
import site_page from './site_page'
import site_blog from './site_blog'
import support_ticket from './support_ticket'
import feedback from './feedback'
import log from './user_logs'
import admin_user from './admin_user'
import end_user from './end_user'
import thumbnail from './thumbnail'

import experiment from './experiment'
import container from './container'
import substance from './substance'
import object_item from './object_item'

export const findResourceSettings = (search) => {
    switch (search) {
        case "posts":
            return site_blog
        case "pages":
            return site_page
        case "support_tickets":
            return support_ticket
        case "logs":
            return log
        case "users":
            return user
        case "feedback":
            return feedback
        case 'end_user':
            return end_user
        case 'admin_user':
            return admin_user
        case 'thumbnail':
            return thumbnail
        case 'experiments':
            return experiment
        case 'containers':
            return container
        case 'substances':
            return substance
        case 'objects':
            return object_item

    }
}

export const resourceDefaultFields = (search) => {
    const settings = findResourceSettings(search)
    const all_fields = []
    const base_fields = Object.entries(settings.fields).map(field => all_fields.push({ name: field[0], value: field[1].default, settings: field }))
    const tags = settings.features.tags
    if (tags) { all_fields.push({ name: settings.features.tags.field, value: [], settings: [settings.features.tags.field, { fieldType: 'array', feature: 'tags' }] }) }

    return all_fields
}

export const resourceFullFields = (search, item) => {
    let defaultFields = resourceDefaultFields(search)
    let returnFields = []
    defaultFields.map(field => returnFields.push(item[field.name] ? { ...field, value: item[field.name] } : field))
    return returnFields
}

export const allResourceSettings = {
    user,
    site_page,
    site_blog,
    support_ticket,
    feedback,
    log
}

//Permissions
//auto- No set/edit/show
//Default- no set
//Static- No edit
//Hidden- No show
//None- do not do anything
//All- logged in & out 
//no_user- logged out
//User, Mod, Admin
//edit-user, edit-mod, edit-admin
//set-user, ..., view-admin

const defaultObjects = {
    user: {
        username: "",
        user_email: "",
        password: null,
        ban_notes: "",
        mailing_list: true
    },
    site_page: {
        page_status: "draft",
        page_category: "About",
        page_symbol: "star",
        page_title: "",
        page_body_text: "",
        page_order: 0,
    },
    site_blog: {
        blog_status: "draft",
        blog_category: "Blog",
        blog_title: "",
        blog_description: "",
        blog_text: "",
        blog_tags: []
    },
    support_ticket: {
        support_ticket_kind: 1,
        support_ticket_message: "",
        support_ticket_name: "",
        support_ticket_email: "",
        require_update: true,
        support_ticket_state: "pending",
        public_notes_text: "",
        private_notes_text: ""
    },
    feedback: {
        feedback_kind: 0,
        feedback_message: "",
        feedback_email: "",
        feedback_name: "",
        logged: false
    },
    log: {},


    experiment: {
        experiment_name: "",
        experiment_description: "",
        experiment_steps: "",
        experiment_start: []
    },
    substance: {
        substance_name: "",
        substance_state_of_matter: "liquid",
        substance_density: 0,
        substance_dispense_volume: 0,
        substance_scientific_name: ""
    },
    object_item: {
        object_name: "",
        object_weight: 0,
        object_volume: 0,
        object_description: "",
        object_image: ""
    },
    container: {
        container_name: "",
        container_mass: 0,
        container_volume: 0,
        container_image: ""
    },


}


//Returns the above object directly
const defaultNewFields = (classKind) => {
    return defaultObjects[`${classKind}`]
}

//Returns the above object along with just the keys in a hash
const defaultNewObj = (classKind) => {
    const values = defaultNewFields(classKind)
    const fields = Object.keys(values)
    return { values, fields }
}

//Takes in an item, and returns the default object with the item's values imposed on top.
const defaultFullFields = (classKind, item) => {
    const defaultObj = defaultNewObj(classKind);

    const formFields = {}

    defaultObj.fields.forEach((key) => {
        formFields[key] = item[key] ? item[key] : defaultObj.values[key]
    });

    return formFields
}

export default { defaultNewFields, defaultNewObj, defaultFullFields }