import Component from '../component'
import { PermissionSetting } from '../permission'

let component = new Component('admin_user')
let pS = new PermissionSetting('all')

component.setPermissions(pS)


// fields: {
// "public-email": {default: "", fieldType: "string", validations: ["unique", "required"] },
// "phone-number": {default: "", fieldType: "string", validations: ["unique", "required"] },
// },


export default component

// name: {
    //     lp: "admin_users",
    //     ls: "admin_user",
    //     up: "AdminUsers",
    //     us: "AdminUser",
    //     urlPath: "/admin_user",
    //     folderPath: "/core",
    //     index_title: "Users List",
    //     view_title: "User Profile",
    //     override_api_path: "/users/auth/edit/info"
    // },
