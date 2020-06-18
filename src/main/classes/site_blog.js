import React from 'react'

const base = 'site_blog'

//----------------------------------------
// RESOURCE PERMISSIONS
//----------------------------------------
const permissions = {
    index: {
        name: "all"
    },
    view: {
        name: "all"
    },
    new: {
        name: "mod"
    },
    edit: {
        name: "mod"
    },
    delete: {
        name: "mod"
    },
}

//----------------------------------------
// RESOURCE FEATURES
//----------------------------------------
const features = {
    filter: {
        options: ['draft', 'public', 'private'],
        protection: "admin",
    },
    sort: {
        options: [
            ['created_at', 'Post Date'],
            ['blog_title', 'Alphabetical']
        ],
    },
    search: {},
    paginate: {},
    tags: {
        field: "blog_tags"
    },
    newLink: {
        protection: "admin",
        options: "Add New +",
    },
    thumbnail: {},
    user: [{
        field: "author_id",
        name: "Author",
        permissions: ["static"]
    }]
}


//----------------------------------------
// RESOURCE FIELDS
//----------------------------------------
const fields = {
    blog_status: {
        default: "draft",
        fieldType: ["select-draft"],
        permissions: {
            all: {
                name: 'mod'
            }
        }
    },
    blog_category: {
        default: "Blog",
        fieldType: ["select-custom", [["One", "One"], ['Blog', "Blog"], ["News", "News"], ["Project", "Project"]]],
        permissions: {
            index: {
                name: 'none'
            },
            view: {
                name: 'none'
            }
        }
    },
    blog_title: {
        default: "",
        fieldType: "string",
        validations: ["unique", "required"],
        titleField: true
    },
    blog_description: {
        default: "",
        fieldType: "string",
        validations: ["required"],
    },
    blog_text: {
        default: "",
        fieldType: "html",
        validations: ["required"],
        permissions: {
            index: {
                name: 'none'
            }
        }
    },

}



//----------------------------------------
// OPTIONS & OVERRIDES
//----------------------------------------
//NAME SETTINGS
const plural = base + 's'
const friendly = 'posts' || plural //override null here in specific cases. Try to avoid this for simplicity reasons, but this is where you can assign a site_blog to direct to blogs 
const upper = base.charAt(0).toUpperCase() + base.substring(1);
const pluralUpper = upper + 's'
const idField = base + '_id'
const uniqueText = 'blog_title'
const pageTitles = {
    index: "All Updates",
    view: upper + " Details",
    new: "Add " + upper,
    edit: "Edit " + upper
}
//OTHER SETTINGS
const options = {
    back_to_all_link: (item) => {
        return `/posts?category=${item.blog_category}`
    }
}
const loader = {
    filter: 'public'
}
const displayTemplates = {
    //INDEX, VIEW, NEW, and EDIT- do a HARD overwrite of the route
    //index: (items) => { return JSON.stringify(items) + "WTFITEMS"}
    //view: (item) => { return JSON.stringify(item) + "WTFITEM"}
    //new: (item) => { return JSON.stringify(item) + "WTFITEM"}
    //edit: (item) => { return JSON.stringify(item) + "WTFITEM"}
    //listItem: (item) => { return JSON.stringify(item) + "WTFITEM"}
}


export default {
    name: {
        lp: plural,
        ls: base,
        up: pluralUpper,
        us: upper,
        friendly,
        urlPath: "/" + friendly,
        title: pageTitles,
    },
    permissions,
    features,
    loader,
    idField,
    uniqueText,
    fields,
    display: displayTemplates,
    options
}