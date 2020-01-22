


const resourceSettings = {
    user: {
        name: {
            lp: "users",
            ls: "user",
            up: "Users",
            us: "User",
        },
        idField: 'user_id',
        permissions: {
            index: "mod",
            view: "all",
            create: "all",
            edit: "self"
        },
        features: {
            filter: {},
            search: {},
            sort: {},
            thumbnail: {}
        },
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
}
const defaultObjects = {
    user: {
        username: "",
        user_email: "",
        password: null,
        ban_notes: "",
        mailing_list: true
    },
    page: {
        page_status: "draft",
        page_category: "About",
        page_symbol: "star",
        page_title: "",
        page_body_text: "",
        page_order: 0,
    },
    post: {
        blog_status: "draft",
        blog_category: "Blog",
        blog_title: "",
        blog_description: "",
        blog_text: "",
        blog_tags: []
    },
    support_ticket: {
        support_ticket_kind: 1,
        support_ticket_message: "",
        support_ticket_name: "",
        support_ticket_email: "",
        require_update: true,
        support_ticket_state: "pending",
        public_notes_text: "",
        private_notes_text: ""
    }
    

}


//Returns the above object directly
const defaultNewFields = (classKind) => {
    return defaultObjects[`${classKind}`]
}

//Returns the above object along with just the keys in a hash
const defaultNewObj = (classKind) => {
    const values = defaultNewFields(classKind)
    const fields = Object.keys(values)
    return { values, fields }
}

//Takes in an item, and returns the default object with the item's values imposed on top.
const defaultFullFields = (classKind, item) => {
    const defaultObj = defaultNewObj(classKind);

    const formFields = {}

    defaultObj.fields.forEach((key) => {
        formFields[key] = item[key] ? item[key] : defaultObj.values[key]
    });

    return formFields
}

export default { defaultNewFields, defaultNewObj, defaultFullFields }