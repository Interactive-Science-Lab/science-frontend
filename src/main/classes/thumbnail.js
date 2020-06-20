import Component from '../component'
import { PermissionSetting } from '../permission'

let component = new Component('thumbnail')
let pS = new PermissionSetting('all')

component.setPermissions(pS)

// fields: {
//     image_url: {default: "https://www.w3schools.com/w3css/img_lights.jpg",},
//     image_kind: {default: 'thumbnail', permissions: ['background']},
//     image_title: {default: 'Thumbnail Image',},
//     image_description: {default: 'An image uploaded by this user',},
//     image_source: {default: "Original Upload"}
// },


export default component
