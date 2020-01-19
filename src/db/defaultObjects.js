
const defaultObjects = {
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