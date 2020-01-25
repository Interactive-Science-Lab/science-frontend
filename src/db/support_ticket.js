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
        create: "all",
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
    loader: { sort: "created_at", sortdir: "DESC" },
    idField: 'support_ticket_id',
    fields: {
        support_ticket_kind: {default: 1, fieldType: ["select-custom", ["Account Error", "Bug Encountered", "General Issue"]] },
        support_ticket_message: {default: "", fieldType: "text", permissions: ['static']},
        support_ticket_name: {default: "", fieldType: "string", permissions: ['static', 'view-mod']},
        support_ticket_email: {default: "", fieldType: "string", permissions: ['static', 'view-mod']},
        require_update: {default: true, fieldType: "boolean", permissions: ['static', 'view-mod']},
        support_ticket_state: {default: "pending", fieldType: ["select-open"], permissions: ['edit-mod']},
        public_notes_text: {default: "", fieldType: "text", permissions: ['mod']},
        private_notes_text: {default: "", fieldType: "text", permissions: ['mod']}
    }
}