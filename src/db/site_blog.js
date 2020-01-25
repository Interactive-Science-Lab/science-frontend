export default  {
    name: {
        lp: "site_blogs",
        ls: "site_blog",
        up: "SiteBlogs",
        us: "SiteBlog",
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
            filter: {
                options: ['draft', 'public', 'private'],
                protection: "admin",
            },
            sort: {
                options: [['created_at', 'Post Date'], ['blog_title', 'Alphabetical']],
            },
            search: {},
            paginate: {},
            tags: { field: "blog_tags" },
            newLink: {
                protection: "admin",
                options: "Add New +",
            },
            thumbnail: {},
            user: [
                {field: "author_id", name: "Author", permissions: ["static"]}
            ]
        },
    loader: { filter: 'public' },
    idField: 'site_blog_id',
    uniqueText: 'blog_title',
    fields: {
        blog_status: {default: "draft", fieldType: ["select-draft"], permissions: ['mod'] },
        blog_category: {default: "Blog", fieldType: ["select-custom", ["Blog", "News", "Project"]], permissions: ['hidden']  }, 
        blog_title: { default: "", fieldType: "string", validations: ["unique", "required"], titleField: true },
        blog_description: { default: "", fieldType: "string", validations: ["required"] },
        blog_text: { default: "", fieldType: "html", validations: ["required"], permissions: ['list-hidden'] },
        
    }
}
