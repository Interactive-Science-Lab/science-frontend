import React from 'react'

const base = 'substance'

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
    paginate: {},
    newLink: {
        protection: "mod",
        options: "Add New +",
    }
}


//----------------------------------------
// RESOURCE FIELDS
//----------------------------------------
const fields = {
    substance_name: { default: "", fieldType: "string", validations: ["unique", "required"], titleField: true },
    substance_density: {  default: "", fieldType: "number", suffix: "g/mL", label: true, permissions: {index: {name: 'none'}} },
    substance_dispense_volume: {  default: "", fieldType: "number", suffix: "mL", label: true, permissions: {index: {name: 'none'}} },
    substance_state_of_matter: { default: "", fieldType: "string", label: true, permissions: {index: {name: 'none'}} },
    substance_scientific_name: { default: "", fieldType: "string", label: true },
    
}



//----------------------------------------
// OPTIONS & OVERRIDES
//----------------------------------------
//NAME SETTINGS
const plural = base + 's'
const friendly = null || plural //override null here in specific cases. Try to avoid this for simplicity reasons, but this is where you can assign a site_blog to direct to blogs 
const upper = base.charAt(0).toUpperCase() + base.substring(1);
const pluralUpper = upper + 's'
const idField = base + '_id'
const uniqueText = base + '_name'
const pageTitles = {
    index: "All " + pluralUpper,
    view: upper + " Details",
    new: "Add " + upper,
    edit: "Edit " + upper
}
//OTHER SETTINGS
const options = {}
const loader = {}
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

