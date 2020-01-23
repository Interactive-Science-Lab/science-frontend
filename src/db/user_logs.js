export default {
    name: {
        lp: "logs",
        ls: "log",
        up: "Logs",
        us: "Log",
        urlPath: "/logs",
        folderPath: "/core/admin",
        folderName: "/logComponents",
        index_title: "Logs",
        view_title: "User Profile"
    },
    permissions: {
        index: "mod",
        view: "all",
        create: "mod",
        edit: "mod"
    },
    features: {
        resource: {
            urlPath: '/logs',
            title: "Logs",
        },
        filter: {
            options: ['all', 'confirmed', 'unconfirmed'],
            protection: "admin",
        },
        search: {},
        paginate: {},
    },
    loader: { filter: 'unlogged'},
    idField: 'site_page_id',
    fields: {
    }
}