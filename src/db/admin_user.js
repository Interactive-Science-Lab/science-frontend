export default {
    name: {
        lp: "admin_users",
        ls: "admin_user",
        up: "AdminUsers",
        us: "AdminUser",
        urlPath: "/admin_user",
        folderPath: "/core",
        index_title: "Users List",
        view_title: "User Profile",
        override_api_path: "/users/auth/edit/info"
    },
    permissions: {},
    features: {},
    loader: {},
    idField: 'admin_user_id',
    fields: {
        "public-email": {default: "", fieldType: "string", validations: ["unique", "required"] },
        "phone-number": {default: "", fieldType: "string", validations: ["unique", "required"] },
    }
}