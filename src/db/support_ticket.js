export default {
    name: {
        lp: "support_tickets",
        ls: "support_ticket",
        up: "SupportTickets",
        us: "SupportTicket",
        urlPath: "/support_tickets",
        folderPath: "/core/admin",
        index_title: "Support Tickets",
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
            options: ['all', 'pending', 'open', 'closed'],
            protection: "admin",
        },
        search: {},
        paginate: {},
    },
    loader: { sort: "created_at", sortdir: "DESC"},
    idField: 'support_ticket_id',
    fields: {
    }
}