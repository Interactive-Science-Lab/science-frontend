import React from 'react'

/* --------------------------- *\
    NAMES & ROUTES
\* --------------------------- */
/* the base "name" of the class */
const base = 'example'
//This is the field that's called when needed
const uniqueText = "example_name"

//AUTOSETTING- Most of these should stay the same, but override if needed.
//Plural is formed by adding an s by default
const plural = base + 's'
//Auto capital + add 's'
const upper = base.charAt(0).toUpperCase() + base.substring(1);
const pluralUpper = upper + 's'

//override here in specific cases. 
//Try to avoid this for simplicity reasons, but this is where you can assign a site_blog to direct to blogs
//This immediately goes to URL path
const friendly = plural  

//Auto formulate the id field
const idField = base + '_id'



/* --------------------------- *\
    FEATURES
\* --------------------------- */
const features = {
    //Allows a filter. All this does is pass a "filter" value to the backend which applies the actual behavior to a field.
    filter: {
        options: ['draft', 'public', 'private'],
        protection: "admin",
    },
    //Allows a user to sort by the following fields.
    sort: {
        options: [
            ['example_field1', 'Display Click'],
            ['example_field2', 'Another Display']
        ],
    },
    //Includes a search bar & ability. No arguments.
    search: {},
    //Includes pagination. No arguments.
    paginate: {},
    //Class has/shows a thumbnail. No arguments.
    thumbnail: {},
    //Allows tags, argument is which field the tags are. 
    tags: {
        field: "example_tagfield"
    },
    //Whether or not an "Add link" is shown on the index page. Takes in a permission & text.
    newLink: {
        protection: "admin",
        options: "Add New +",
    },
    //Includes the info for a user attached field, able to add more than one
    user: [
        {field: "author_id", name: "Author", permissions: {all: {name: "all"}} },
        {field: "log_submitting_user_id", name: "Submitting User", permissions: {all: {name: "all"}} },
        {field: "log_confirming_user_id", name: "Confirming User", permissions: {all: {name: "all"}}},
    ]
}


//----------------------------------------
// RESOURCE FIELDS
//----------------------------------------
const fields = {
    example_field: {
        //default value for the field
        default: "",
        /*
        "string"- a string, gives a box
        "text"- a long string, text box
        "boolean"- a boolean, does a checkbox
        "number" 
        "html"
        "object"  
        "text-array"
        "reference" 
        "local-image" 
        "hidden"
        "icon"
        ["select-open"] 
        ["select-draft"] 
        ["select-custom", [[x, X], [y, Y]]
        */
        fieldType: '',
        //Set permissions for the field itself- 
        //Either set "all", or you can set index, view, edit
        permissions: {
            all: {name: 'mod'},
            index: {name: 'none'}
        },
        validations: ["unique", "required"],
        titleField: true,// set true to make it important
        suffix: "", // incldues a suffix everytime this thing is printed
        label: true, // includes a label on the index & show page
        formInfo: "", // additional information to display on a form

        /* The following fields will output custom displays everytime this field is displayed. 
        Index & View will show for those, Display will show for both unless the prior is set
        Same with New, Edit, and form */
        customDisplay: (value) => {
            return `${value}- THATS THE CUSTOM STUFF`
        },
        customForm: (field, callback) => {
            return <div>CUSTOM ENTRY </div>
        },
        customIndex: (value) => {
            return `${value}- THATS THE CUSTOM INDEX`
        },
    }
}



//----------------------------------------
// OPTIONS & OVERRIDES
//----------------------------------------


//OTHER SETTINGS
const options = {
    //Used to change the "Back To All" link that appears on a "Show" page
    //The item record is passed through for reference.
    back_to_all_link: (item) => { return '' },
    //Custom message to display after a "New"
    submit_message: () => { return <div></div> }
}
const loader = {
    filter: 'public'
}


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
const display = {
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
    display,
    options
}