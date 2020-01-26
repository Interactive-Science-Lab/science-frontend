export default {
    name: {
        lp: "feedbacks",
        ls: "feedback",
        up: "Feedbacks",
        us: "Feedback",
        urlPath: "/feedback",
        folderPath: "/core/admin",
        index_title: "Feedback",
        view_title: "User Profile"
    },
    permissions: {
        index: "mod",
        view: "mod",
        create: "all",
        edit: "none"
    },
    features: {
        resource: {
            urlPath: '/feedback',
            title: "Provided Feedback",
        },
        filter: {
            options: ['unlogged', 'logged'],
            protection: "admin",
        },
        search: {},
        paginate: {},
    },
    loader: {filter: '', sort: "created_at", sortdir: "DESC"},
    idField: 'feedback_id',
    fields: {
        feedback_kind: {default: "", fieldType: ['select-custom', ['Comment', 'Question', 'Concern']], permissions: ['static']},
        feedback_message: {default: "", fieldType: 'text', permissions: ['static'] },
        feedback_name: {default: "", fieldType: 'string', permissions: ['static'] },
        feedback_email: {default: "", fieldType: 'string', permissions: ['static'] },
        logged: {default: false, fieldType: 'boolean'}
    }
}