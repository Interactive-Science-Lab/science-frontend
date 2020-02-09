export default {
    name: {
        lp: "users",
        ls: "user",
        up: "Users",
        us: "User",
        urlPath: "/users",
        folderPath: "/core",
        index_title: "Users List",
        view_title: "User Profile"
    },
    permissions: {
        index: "mod",
        view: "all",
        create: "all",
        edit: "self"
    },
    features: {
        filter: {
            options: ['all', '1', '2', '3'],
            protection: "admin",
        },
        search: {},
        paginate: {},
        thumbnail: {},
        user_info: {}
    },
    loader: {},
    idField: 'user_id',
    fields: {
        username: {default: "", fieldType: "string", validations: ["unique", "required"] },
        user_email: {default: "", fieldType: "string", validations: ["unique", "required"] },
        password: {default: "", fieldType: "string", validations: ["required"], permissions: ['self', 'hidden'] },
        ban_notes: {default: "", fieldType: "text", permissions: ['mod']},
        mailing_list:{default: false, fieldType: "boolean", permissions: ['list-hidden']},
        user_role: {default: 1, fieldType: "number", permissions: ['default', 'edit-admin']},
        user_kind: {permissions: ['static', 'auto'], fieldType: "string"},
        user_verified: {permissions: ['static', 'default'], fieldType: "hidden"},
        last_login_attempt: {permissions: ['background'], fieldType: "hidden"},
        login_attempts: {permissions: ['background'], fieldType: "hidden"},
        forgotten_password_reset_time:{permissions: ['background'], fieldType: "hidden"}
    },
    display: {}
}