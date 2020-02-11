import React from 'react'

const base = 'container'

const permissions = {
    index: "all",
    view: "all",
    create: "mod",
    edit: "mod",
    delete: "mod"
}

const features = {
    paginate: {},
    newLink: {
        protection: "mod",
        options: "Add New +",
    }
}

const fields = {
    container_name: { 
        default: "", 
        fieldType: "string", 
        validations: ["unique", "required"], 
        titleField: true 
    },
    container_mass: { 
        default: "", 
        fieldType: "number", 
        customDisplay: (value) => { return `${value/1000}g`},
        // customForm: (field, callback) => { return  <div>CUSTOM ENTRY</div> },
        formInfo: "Enter in mg, will display through app in grams.",
        label: true, 
        permissions: ['list-hidden']
    },
    container_volume: { 
        default: "", 
        fieldType: "number", 
        suffix: "mL", 
        label: true, 
        permissions: ['list-hidden'] 
    },
    container_properties: { 
        default: "", 
        fieldType: "object", 
        permissions: ['hidden'] 
    },
    container_image: { 
        default: "", 
        fieldType: "local-image", 
        permissions: ['list-hidden'], 
        label: true 
    },
}

const plural = base + 's'
const upper = base.charAt(0).toUpperCase() + base.substring(1);
const pluralUpper = upper + 's'

const loader = {}

export default  {
    name: {
        lp: plural,
        ls: base,
        up: pluralUpper,
        us: upper,
        urlPath: "/" + plural,
        folderPath: "/" + plural,
        title: {
            index: "All " + pluralUpper,
            view: upper + " Details",
            new: "Add " + upper,
            edit: "Edit " + upper
        },
    },
    permissions,
    features,
    loader,
    idField: base + '_id',
    uniqueText: base + '_name',
    fields,
    display: {}
}



