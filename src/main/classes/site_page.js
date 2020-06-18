import React from 'react'
import {Link} from 'react-router-dom'

const base = 'site_page'

const permissions = {
    index: {
        name: "all"
    },
    view: {
        name: "all"
    },
    new: {
        name: "all"
    },
    edit: {
        name: "all"
    },
    delete: {
        name: "mod"
    },
}


const features = {
    filter: {
        options: ['draft', 'public', 'private'],
        protection: "admin",
    },
    sort: {
        options: [['page_title', 'Alphabetical'], ['page_category', 'Category'], ['page_order', 'Order']],
    },
    search: {},
    paginate: {},
    newLink: {
        protection: "admin",
        options: "Add New +",
    },
    thumbnail: {},
}

const fields = {
    page_status: {default: "draft", fieldType: ["select-draft"] },
    page_category: {default: "About", fieldType: ["select-custom", ["About", "Features"]], validations: ["required"]  },
    page_symbol: {default: "star", fieldType: "icon" },
    page_title: {default: "", fieldType: "string", validations: ["unique", "required"], titleField: true },
    page_body_text: {default: "", fieldType: "html", validations: ["required"] }, 
    page_order: {default: 0, fieldType: 'number', permissions: ["hidden"], validations: ["required"]}
}

const loader = { filter: 'public' }

export default  {
    name: {
        lp: "site_pages",
        ls: "site_page",
        up: "SitePages",
        us: "SitePage",
        urlPath: "/pages",
        folderPath: "/content",
        friendly: "Page",
        title: {
            index: "All Pages",
            view: "Page Details",
            new: "Add Page",
            edit: "Edit Page"
        },
    },
    permissions,
    features,
    loader,
    idField: base + '_id',
    uniqueText: base + '_name',
    fields,
    display: {
      
    },
    options: {
    }
}



