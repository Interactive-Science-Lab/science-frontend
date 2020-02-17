import api, { curr_user, headers, apiPath } from 'helpers/api'
import axios from 'axios'
import {resourceFullFields} from './defaultObjects'

/*
Functionality: Helpers regarding permissions, fields, and settings.

------------------------------------
---Functions---
checkPermission(permission)

checkFieldPermission(action, fieldPermissions)
checkResourcePermission(action, settings)

customResourceDisplay(action, settings)
customFieldDisplay(action, settings)
-------------------------------------


----------------------------------------
--Data-Types---
a) "Permission" pseudo-class contains NO information about the resource/route, just the user.
permission = {
    name: 'all', //Shortcut of sorts- available: all, logged_in, user, no_user, none, webmaster, admin, mod
    role: null,
    kind: null,
    join: 'or',
    custom: null //Plug in a custom computated true/false value for special cases.
}

b) fieldPermissions have an "all" field for ease of use, and then the four display variations. 
fieldPermissions = {
    all: Permission{name: 'all'},
    index: Permission{},
    view: Permission{},
    new: Permission{},
    edit: Permission{},
}
----------------------------------------

*/




//------------------------------
// PATHS & URLS 
//------------------------------
const urlPath = (settings) => { return settings.name.urlPath }
const idPath = (settings, item) => { return urlPath(settings) + `/${item[settings.idField]}` }
const beUrlPath = (settings) => { return api.apiPath(urlPath(settings)) }
const beIdPath = (settings, item) => { return api.apiPath(idPath(settings, item)) }

const feIndexPath = (settings) => { return urlPath(settings) }
const feNewPath = (settings) => { return urlPath(settings) + '/new'}
const feViewPath = (settings, item) => { return idPath(settings, item)}
const feEditPath = (settings, item) => { return idPath(settings, item) + '/edit'}

const beIndexCall = (settings) => { return axios.get( beUrlPath(settings), headers) }
const beViewCall = (settings, item) => { return axios.get( beIdPath(settings, item), headers) }
const beDeleteCall = (settings, item) => { return axios.delete(beIdPath(settings, item), headers) }
const beNewCall = (settings, item) => { 
    return axios.post( beUrlPath(settings), item, headers ) 
}
const beEditCall = (settings, item) => { 
    //Grab the path quick first
    const path = beIdPath(settings, item)
    //Map over this item to get the things we can call on the db.
    let dbItem = {}
    resourceFullFields(settings, item).map(field => dbItem[field.name] = field.value)
    return axios.put( path, dbItem, headers ) 
}

//Returns any notes associated with the field type or custom
const fieldNotes = (field) => {
    return field.formInfo
}


//=====================
// PERMISSIONS 
//=====================
//This function goes through the permission, comparing it to the current user.
const checkPermission = (permission) => {
    if(!permission || Object.entries(permission).length === 0) { throw "ASTEROID: Permission error with resource settings. Accepted format: {action: {name: %s}}" }
    let ret = true
    let roleCheck = null, kindCheck = null
    if (permission.name === 'all') { ret = true }
    if (permission.name === 'logged_in' || permission.name === 'user') { ret = curr_user ? true : false }
    if (permission.name === 'no_user') { ret = curr_user ? false : true }
    if (permission.name === 'none') { ret = false }
    if (permission.name === 'webmaster') { permission = { role: 3, kind: 'admin_user', join: 'and' } }
    if (permission.name === 'admin') { permission = { role: 3 } }
    if (permission.name === 'mod') { permission = { role: 2 } }

    if (permission.role) { roleCheck = curr_user.user_role >= permission.role }
    if (permission.kind) { kindCheck = curr_user.user_kind === permission.kind }

    if (permission.join === 'or') {
        ret = ret || roleCheck || kindCheck || permission.custom
    } else {
        //Put them in an array and map. If they are exactly false, return false.
        [ret, roleCheck, kindCheck, permission.custom].forEach((c) => c === false ? ret = false : null)
    }
    return ret
}

//----------------------
//Check Functions
//----------------------
// These functions check a field and a resource, respectively.
// - - -
//This function takes in an action (index, view, edit, new), and the field permissions.
const checkFieldPermission = (action, fieldPermissions) => {
    let ret = true
    if (fieldPermissions) {
        if (fieldPermissions['all']) {
            ret = checkPermission(fieldPermissions['all'])
        }
        //A specific actions should override an all.
        if (fieldPermissions[action]) {
            ret = checkPermission(fieldPermissions[action])
        }
    }
    return ret
}

//This is just a small helper function which takes in an action and settings.
const checkResourcePermission = (action, settings) => {
    return checkPermission(settings.permissions[action])
}


//------------------------------
//Override functions
//------------------------------
// These functions are the ones that allow you to easily override the default displays.
//- - - 
//ability to set custom display (custom index and custom view) and custom form (custom new and custom edit)
const customResourceDisplay = (action, settings) => {
    switch (action) {
        case "index":
            return settings.display.index
        case "view":
            return settings.display.view
        case "new":
            return settings.display.new
        case "edit":
            return settings.display.edit
    }
}

const customFieldDisplay = (action, settings) => {
    switch (action) {
        case "index":
            return settings.customIndex || settings.customDisplay
        case "view":
            return settings.customView || settings.customDisplay
        case "new":
            return settings.customNew || settings.customForm
        case "edit":
            return settings.customEdit || settings.customForm
    }
}

const validateInput = (settings, item) => {
    let ret = true

    //Get the field list from the settings.
    Object.entries(settings.fields).map(field => {
        //Put the name in a variable and copy the value over.
        let fieldName = field[0]
        field = field[1]
        //If there's any validations, loop through them and handle them.
        if(field.validations) {
            field.validations.map(validation => {
                if(validation === 'required'){
                    ret = ret && item[fieldName] && item[fieldName] != ''
                }
            })
        }
    })

    return ret
}



export default {
    checkPermission,
    checkResourcePermission,
    checkFieldPermission,
    customResourceDisplay,
    customFieldDisplay,
    urlPath,
    idPath,
    beNewCall,
    beViewCall,
    beIndexCall,
    beEditCall,
    beDeleteCall,
    feNewPath,
    feViewPath,
    feIndexPath,
    feEditPath,
    fieldNotes,
    validateInput
}