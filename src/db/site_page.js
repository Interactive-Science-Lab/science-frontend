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
    }
}