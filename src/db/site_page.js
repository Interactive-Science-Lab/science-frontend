export default {
    name: {
        lp: "site_pages",
        ls: "site_page",
        up: "SitePages",
        us: "SitePage",
        urlPath: "/pages",
        folderPath: "/content",
        index_title: "Page List",
        view_title: "User Profile"
    },
    permissions: {
        index: "mod",
        view: "all",
        create: "mod",
        edit: "mod"
    },
    features: {
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
    },
    loader: { filter: 'public' },
    idField: 'site_page_id',
    fields: {
        page_status: {default: "draft", fieldType: ["select-draft"] },
        page_category: {default: "About", fieldType: ["select-custom", ["About", "Features"]], validations: ["required"]  },
        page_symbol: {default: "star", fieldType: "icon" },
        page_title: {default: "", fieldType: "string", validations: ["unique", "required"], titleField: true },
        page_body_text: {default: "", fieldType: "html", validations: ["required"] }, 
        page_order: {default: 0, fieldType: 'number', permissions: ["hidden"], validations: ["required"]}
    },
    display: {}
}