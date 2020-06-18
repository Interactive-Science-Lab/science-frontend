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
    newLink: {
        protection: "mod",
        options: "Add New +",
    }
}


//----------------------------------------
// RESOURCE FIELDS
//----------------------------------------
const fields = {
    display_name: { default: "", fieldType: "string", validations: ["unique", "required"], titleField: true },
    scientific_name: { default: "", fieldType: "string", label: true },
    description: { default: "", fieldType: "string", label: true },
    color: { default: "", fieldType: "string", label: true, permissions: { index: {name: 'none'}} },
    texture: { default: "", fieldType: "string", label: true, permissions: { index: {name: 'none'}} },
    container: { default: "", fieldType: "string", label: true, permissions: { index: {name: 'none'}} },
    properties: { default: "", fieldType: "string", label: true, permissions: { index: {name: 'none'}, edit: {name: "webmaster" }} },
    density: { default: "", fieldType: "number", label: true, permissions: { index: {name: 'none'}} },
    ph: { default: "", fieldType: "number", label: true, permissions: { index: {name: 'none'}} },
    temperature: { default: "", fieldType: "number", label: true, permissions: { index: {name: 'none'}} },
    low_temp_point: { default: "", fieldType: "number", label: true, permissions: { index: {name: 'none'}} },
    high_temp_point: { default: "", fieldType: "number", label: true, permissions: { index: {name: 'none'}} },
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
const uniqueText = 'display_name'
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

