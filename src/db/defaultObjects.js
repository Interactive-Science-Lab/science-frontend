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
import tool from './tool'

//This is where we match the route to the actual settings. The case MUST match the Url Path set in the setting file
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
        case 'tools':
            return tool

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

export const resourceFullFields = (settings, item) => {
    let defaultFields = resourceDefaultFields(settings.name.friendly)
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