import React from 'react'

/* --------------------------- *\
    NAMES & ROUTES
\* --------------------------- */
/* the base "name" of the class */
const base = 'example'
const uniqueText = "example_name"

const plural = base + 's'
const upper = base.charAt(0).toUpperCase() + base.substring(1);
const pluralUpper = upper + 's'
const friendly = plural  
const idField = base + '_id'

/* --------------------------- *\
    FEATURES
\* --------------------------- */
const features = {
    filter: {
        options: ['draft', 'public', 'private'],
        protection: "admin",
    },
    sort: {
        options: [
            ['example_field1', 'Display Click'],
            ['example_field2', 'Another Display']
        ],
    },
    search: {},
    paginate: {},
    thumbnail: {},
    tags: { field: "example_tagfield" },
    newLink: {
        protection: "admin",
        options: "Add New +",
    },
    user: [
        {field: "author_id", name: "Author", permissions: {all: {name: "all"}} },
    ]
}

//----------------------------------------
// RESOURCE FIELDS
//----------------------------------------
const fields = {
    example_field: { default: "", fieldType: 'string', permissions: { all: {name: 'all'} }, },
    example_field2: { default: "", fieldType: 'string', permissions: { all: {name: 'all'} }, },
    example_field3: { default: "", fieldType: 'string', permissions: { all: {name: 'all'} }, },
}

//----------------------------------------
// OPTIONS & OVERRIDES
//----------------------------------------
//OTHER SETTINGS
const options = {}
const loader = { filter: '' }


/* --------------------------- *\
    PAGE TITLES- What's shown at the top of each page by default
\* --------------------------- */
const pageTitles = {
    index: "All " + pluralUpper,
    view: upper + " Details",
    new: "Add " + upper,
    edit: "Edit " + upper
}

/* --------------------------- *\
    PERMISSIONS - Set "all", "mod", "admin"
\* --------------------------- */
const permissions = {
    index: { name: "all" },
    view: { name: "all" },
    new: { name: "mod" },
    edit: { name: "mod" },
    delete: { name: "mod" },
}


//Uncomment a route and edit to completely override a route.
const display = {}

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
    display,
    options
}