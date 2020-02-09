export default  {
    name: {
        lp: "containers",
        ls: "container",
        up: "Containers",
        us: "Container",
        urlPath: "/containers",
        folderPath: "/containers",
        index_title: "Containers"
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
    idField: 'container_id',
    uniqueText: 'container_name',
    
    fields: {
        container_name: { default: "", fieldType: "string", validations: ["unique", "required"], titleField: true },
        container_mass: { default: "", fieldType: "number", suffix: "g", label: true, permissions: ['list-hidden']},
        container_volume: { default: "", fieldType: "number", suffix: "mL", label: true, permissions: ['list-hidden'] },
        container_properties: { default: "", fieldType: "object", permissions: ['hidden'] },
        container_image: { default: "", fieldType: "local-image", permissions: ['list-hidden'], label: true },
        
    },
    display: {}
}
