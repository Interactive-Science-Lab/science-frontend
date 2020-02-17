import React from 'react'

const base = 'object_item'

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
const fields ={
    object_name: { default: "", fieldType: "string", validations: ["unique", "required"], titleField: true },
    object_description: { default: "", fieldType: "string" },
    object_weight: { default: "", fieldType: "number", suffix: "g", label: true, permissions: {index: {name: 'none'}} },
    object_volume: { default: "", fieldType: "number", suffix: "mL", label: true, permissions: {index: {name: 'none'}} },
    object_image: { default: "", fieldType: "local-image", permissions: {index: {name: 'none'}}, label: true },
    
}



//----------------------------------------
// OPTIONS & OVERRIDES
//----------------------------------------
//NAME SETTINGS
const plural = base + 's'
const friendly = 'objects' || plural //override null here in specific cases. Try to avoid this for simplicity reasons, but this is where you can assign a site_blog to direct to blogs 
const upper = 'ObjectItem';
const pluralUpper = upper + 's'
const idField = base + '_id'
const uniqueText = 'object' + '_name'
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
