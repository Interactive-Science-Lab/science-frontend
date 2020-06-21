import Component from '../../main/component'
import { PermissionSetting } from '../../main/permission'

let component = new Component('admin_user')
let pS = new PermissionSetting('all')

component.setPermissions(pS)


// fields: {
//     public_email: {default: "", fieldType: "string", validations: ["unique", "required"] },
//     phone_number: {default: "", fieldType: "string", validations: ["unique", "required"] },
// },


export default component