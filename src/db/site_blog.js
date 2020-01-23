export default  {
    name: {
        lp: "site_blogs",
        ls: "site_blog",
        up: "site_blog",
        us: "site_blog",
        urlPath: "/posts",
        folderPath: "/content",
        index_title: "Post List"
    },
    permissions: {
        index: "all",
        view: "all",
        create: "mod",
        edit: "mod"
    },
    features: {
            resource: {
                urlPath: '/posts',
                title: "Posts",
            },
            filter: {
                options: ['draft', 'public', 'private'],
                protection: "admin",
            },
            sort: {
                options: [['created_at', 'Post Date'], ['blog_title', 'Alphabetical']],
            },
            search: {},
            paginate: {},
            tags: {},
            newLink: {
                protection: "admin",
                options: "Add New +",
            }
        },
    loader: { filter: 'public' },
    idField: 'site_page_id',
    fields: {
    }
}