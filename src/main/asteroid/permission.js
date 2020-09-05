import { curr_user } from 'helpers/api'

/* 
PERMISSION SETTING controls who can see what versions of information.

The object really only has one field, which can store "rules" or Permission class instances based on the action or view

There's 7 possible "action/views"- and they follow a specificity flow- 
Most general is "all"- chich refers to, well, all.
Then "display"      and      "form"        both include 2 views;
"index" & "view"     +    "new" & "edit"       respectively


*/

//All is used for both targeting users & actions
var ALL = "all",
    //==Target specific users== 
    MOD = "mod", ADMIN = "admin", LOGGEDIN = "logged_in", NOUSER = 'no_user', NONE = "none", SELF = "self",
    WEBMASTER = 'webmaster',

    //==Action / view list==
    //Display is the 'category' for index & view
    DISPLAY = "display", INDEX = "index", VIEW = "view",
    //Form is the 'category' for edit & new
    FORM = "form", EDIT = "edit", NEW = "new", DELETE = 'delete',

    //==Quick Permission settings==
    //admin, mod, loggedin, nouser
    CONTENT = 'content', //Mod edit, all view
    SUBMIT = 'submit', //All submit, mod view
    SUBMITCONTENT = 'submit-content', //all submit, all view, mod edit
    SECRET = 'secret', //completely hidden at all times- including forms
    HIDDEN = 'hidden', //do not show on index or view
    NOINDEX = 'noIndex', //don't show on the index, more like a detail / text
    MODINDEX = 'modIndex', //hide the index unless mod
    STATIC = 'static', //No edit at all
    AUTO = 'auto', //Do not show new
    STATICSUBMIT = 'static-submit',//anyone submits, mod views, no one edits
    PERSONALCONTENT = 'personal-content', //anyone can create, anyone can view, only self can edit, only self can delete
    PRIVATE = 'private' //anyone can create, only see own.


export class PermissionSetting {
    constructor(data) {
        console.log(data)
        this.permissionObject = {}
        this.id = data.permisssion_id
        this.setPermissions(data.all)
    }

    setPermissions = (string) => {
        switch (string) {
            case ALL:
            case null:
            case undefined:
                this.setPermission(ALL, ALL)
                break;
            case NONE:
                this.setPermission(ALL, NONE)
                break;
            case CONTENT:
                this.setPermission(DISPLAY, ALL)
                this.setPermission(FORM, MOD)
                break;
            case SUBMIT:
                this.setPermission(ALL, MOD)
                this.setPermission(NEW, ALL)
                break;
            case SUBMITCONTENT:
                this.setPermission(DISPLAY, ALL)
                this.setPermission(NEW, ALL)
                this.setPermission(EDIT, MOD)
                break;
            case LOGGEDIN:
                this.setPermission(ALL, LOGGEDIN)
                break;
            case WEBMASTER:
                this.setPermission(ALL, WEBMASTER)
                break;
            case ADMIN:
                this.setPermission(ALL, ADMIN)
                break;
            case MOD:
                this.setPermission(ALL, MOD)
                break;
            case SECRET:
                this.setPermission(ALL, NONE)
                break;
            case HIDDEN:
                this.setPermission(DISPLAY, NONE)
                break;
            case NOINDEX:
                this.setPermission(INDEX, NONE)
                break;
            case MODINDEX:
                this.setPermission(INDEX, MOD)
                break;
            case STATIC:
                this.setPermission(EDIT, NONE)
                break;
            case AUTO:
                this.setPermission(NEW, NONE)
                break;
            case STATICSUBMIT:
                this.setPermission(DISPLAY, MOD)
                this.setPermission(NEW, ALL)
                this.setPermission(EDIT, NONE)
                break;
            case PERSONALCONTENT:
                this.setPermission(NEW, ALL)
                this.setPermission(EDIT, SELF)
                this.setPermission(DISPLAY, ALL)
                break;
            case PRIVATE:
                this.setPermission(NEW, ALL)
                this.setPermission(ALL, SELF)
                break;
            case NOUSER:
                this.setPermission(ALL, NOUSER)
                break;
            default:
                throw new Error(`ASTEROID: Unknown permissions type, "${string}"`)
        }

    }

    //This is used to add another set of permissions onto what's already there, and returns new self for ease.
    modifyPermissions = (string) => {
        this.setPermissions(string)
        return this
    }

    //Helper function to call the permission class itself.
    setPermission = (view, phrase) => {
        this.permissionObject[view] = new Permission(phrase)
    }

    /* 
        "Check" has specificity flow-
            First it checks to see if the EXACT action has a rule, if not,
            It sees if the action category (display is both index & view; form is both edit & new), If not,
            It sees if there's a rule for "all".
    
    */
    checkPermission = (view, item = {}, selfId = null) => {
        let permission = null

        switch (view) {
            case INDEX:
                permission = this.permissionObject.index || this.permissionObject.display || this.permissionObject.all
                break;
            case VIEW:
                permission = this.permissionObject.view || this.permissionObject.display || this.permissionObject.all
                break;
            case EDIT:
                permission = this.permissionObject.edit || this.permissionObject.form || this.permissionObject.all
                break;
            case NEW:
                permission = this.permissionObject.new || this.permissionObject.form || this.permissionObject.all
                break;
            case DELETE:
                permission = this.permissionObject.delete
                break;
            default:
                throw new Error(`ASTEROID: Unknown view type- ${view}`)
        }

        if (permission) {
            return permission.check(item, selfId)
        } else {
            return true
        }
    }
}

/* 
    ==Options==
    'all'
    'logged_in'
    'no_user'
    'none'
    'admin'
    'mod'
    'webmaster'**
    'self'**
*/

export class Permission {
    constructor(name) {
        this.rules = {
            name: name
        }
    }

    check = (item = {}, selfId = null) => {
        switch (this.rules.name) {
            case NONE:
                return false;
            case ALL:
                return true;
            case MOD:
                return false
            case ADMIN:
                return curr_user.user_kind === 'admin_user'
            case WEBMASTER:
                return curr_user?.user_role === 3 && curr_user.user_kind === 'admin_user'
            case LOGGEDIN:
                return curr_user
            case NOUSER:
                return !curr_user
            case SELF:
                let selfCheck = selfId && item[selfId]
                if (!selfCheck) { throw new Error("ASTEROID: Self Check Error; selfID or item NOT SET") }
                return item[selfId] === curr_user?.user_id
            default:
                throw new Error("ASTEROID: Unknown permission type")

        }
    }

}