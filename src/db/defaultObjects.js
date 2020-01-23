import user from './user'
import site_page from './site_page'
import site_blog from './site_blog'
import support_ticket from './support_ticket'
import feedback from './feedback'
import log from './user_logs'

export const findResourceSettings = (search) => {
    switch(search) {
        case "posts": 
            return site_blog
        case "pages":
            return site_page
        case "support_tickets":
            return support_ticket
        case "logs":
            return log
        case "users":
            return user
        case "feedback":
            return feedback
        
    }
}

export const allResourceSettings = {
    user,
    site_page,
    site_blog,
    support_ticket,
    feedback,
    log
}


const defaultObjects = {
    user: {
        username: "",
        user_email: "",
        password: null,
        ban_notes: "",
        mailing_list: true
    },
    site_page: {
        page_status: "draft",
        page_category: "About",
        page_symbol: "star",
        page_title: "",
        page_body_text: "",
        page_order: 0,
    },
    site_blog: {
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