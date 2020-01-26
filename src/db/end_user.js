export default {
    name: {
        lp: "admin_users",
        ls: "admin_user",
        up: "AdminUsers",
        us: "AdminUser",
        urlPath: "/admin_users",
        folderPath: "/core",
        index_title: "Users List",
        view_title: "User Profile"
    },
    permissions: {},
    features: {},
    loader: {},
    idField: 'admin_user_id',
    fields: {
        public_email: {default: "", fieldType: "string", validations: ["unique", "required"] },
        phone_number: {default: "", fieldType: "string", validations: ["unique", "required"] },
    }
}