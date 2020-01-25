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
        view: "mod",
        create: "none",
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
        user: [
            {field: "log_submitting_user_id", name: "Submitting User", permissions: ["static"]},
            {field: "log_confirming_user_id", name: "Confirming User", permissions: ["static"]},
        ]
    },
    loader: { filter: 'unlogged'},
    idField: 'log_id',
    fields: {
        route: {permissions: ['static'], fieldType: 'string' },
        method: {permissions: ['static'], fieldType: 'string'},
        changes: {permissions: ['static'], fieldType: 'object'},
        previous: {permissions: ['static'], fieldType: 'object'},
        notes: {default: "", fieldType: "text"},
        log_confirmed: {permissions: ['static'], fieldType: 'boolean'},
        object_id: {permissions: ['static'], fieldType: 'reference'},
    }
}