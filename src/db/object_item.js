export default  {
    name: {
        lp: "object_items",
        ls: "object_item",
        up: "ObjectItems",
        us: "ObjectItem",
        urlPath: "/objects",
        folderPath: "/objects",
        index_title: "Objects"
    },
    permissions: {
        index: "all",
        view: "all",
        create: "mod",
        edit: "mod"
    },
    features: {
            paginate: {},
            newLink: {
                protection: "mod",
                options: "Add New +",
            }
    },
    loader: { },
    idField: 'object_item_id',
    uniqueText: 'object_name',
    
    fields: {
        object_name: { default: "", fieldType: "string", validations: ["unique", "required"], titleField: true },
        object_description: { default: "", fieldType: "string" },
        object_weight: { default: "", fieldType: "number", suffix: "g", label: true, permissions: ['list-hidden'] },
        object_volume: { default: "", fieldType: "number", suffix: "mL", label: true, permissions: ['list-hidden'] },
        object_image: { default: "", fieldType: "local-image", permissions: ['list-hidden'], label: true },
        
    },
    display: {}
}
