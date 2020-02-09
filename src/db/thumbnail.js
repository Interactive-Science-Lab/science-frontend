export default {
    name: {
        lp: "admin_users",
        ls: "admin_user",
        up: "AdminUsers",
        us: "AdminUser",
        urlPath: "/thumbnail",
        folderPath: "/core",
        index_title: "Users List",
        view_title: "User Profile"
    },
    permissions: {},
    features: {},
    loader: {},
    idField: 'admin_user_id',
    fields: {
        image_url: {default: "https://www.w3schools.com/w3css/img_lights.jpg",},
        image_kind: {default: 'thumbnail', permissions: ['background']},
        image_title: {default: 'Thumbnail Image',},
        image_description: {default: 'An image uploaded by this user',},
        image_source: {default: "Original Upload"}
    },
    display: {}
}