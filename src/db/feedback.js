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
        feedback_kind: {default: "", },
        feedback_message: {default: "", },
        feedback_name: {default: "", },
        feedback_email: {default: "", },
        logged: {default: false}
    }
}