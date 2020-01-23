export default {
    name: {
        lp: "users",
        ls: "user",
        up: "Users",
        us: "User",
        urlPath: "/users",
        folderPath: "/core",
        index_title: "Users List",
        view_title: "User Profile",
        override_router: true
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
    },
    loader: {},
    idField: 'user_id',
    fields: {
        username: {default: "", dataType: "string", validations: ["unique", "required"] },
        user_email: {default: "", dataType: "string", validations: ["unique", "required"] },
        password: {default: "", dataType: "string", validations: ["required"], permissions: ['self'] },
        ban_notes: {default: "", dataType: "text", permissions: ['mod']},
        mailing_list:{default: false, dataType: "boolean",},
        user_role: {default: 1, dataType: "integer", permissions: ['edit-admin']},
        user_kind: {permissions: ['static']},
        user_verified: {permissions: ['static']},
        last_login_attempt: {permissions: ['static', 'hidden']},
        login_attempts: {permissions: ['static', 'hidden']},
        forgotten_password_reset_time:{permissions: ['static', 'hidden']}
    }
}