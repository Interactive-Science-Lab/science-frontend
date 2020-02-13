import { curr_user } from 'helpers/api'

//permission contains NO information about the resource/route, just the user.
const resourcePermissionDefault = {
    name: 'all', //Shortcut of sorts.
    role: null,
    kind: null,
    join: 'or',
    custom: null //Plug in a custom computated true/false value for special cases.
}

//Field permissions have an "all" field for ease of use, and then the four display variations.
//The all 5 are resourcePermissions.
const fieldPermissionDefault = {
    all: { name: 'all' },
    index: { name: 'all' },
    view: { name: 'all' },
    new: { name: 'all' },
    edit: { name: 'all' }
}

//-------------------------
//PERMISSION MAGIC FUNCTION 
//-------------------------
//This function goes through the permission, comparing it to the current user.
const checkResourcePermission = (permission) => {
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
const checkFieldView = (action, fieldPermissions) => {
    let ret = true
    if (fieldPermissions) {
        if (fieldPermissions['all']) {
            ret = checkResourcePermission(fieldPermissions['all'])
        }
        //A specific actions should override an all.
        if (fieldPermissions[action]) {
            ret = checkResourcePermission(fieldPermissions[action])
        }
    }
    return ret
}

//This is just a small helper function which takes in an action and settings.
const checkRender = (action, settings) => {
    return checkResourcePermission(settings.permissions[action])
}


//------------------------------
//Override functions
//------------------------------
// These functions are the ones that allow you to easily override the default displays.
//- - - 
//ability to set custom display (custom index and custom view) and custom form (custom new and custom edit)
const checkResourceDisplay = (action, settings) => {
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

const checkFieldDisplay = (action, settings) => {
    switch (action) {
        case "index":
            return settings.customIndex
        case "view":
            return settings.customView
        case "new":
            return settings.customNew
        case "edit":
            return settings.customEdit
        case "display":
            return settings.customDisplay
        case "form":
            return settings.customForm
    }
}



export default {
    checkFieldView,
    checkRender,
    checkResourceDisplay,
    checkFieldDisplay
}