import { curr_user } from 'helpers/api'

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


//This function goes through the permission, comparing it to the current user.
const checkPermission = (permission) => {
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



export default {
    checkPermission,
    checkResourcePermission,
    checkFieldPermission,
    customResourceDisplay,
    customFieldDisplay
}