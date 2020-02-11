export default  {
    name: {
        lp: "experiments",
        ls: "experiment",
        up: "Experiments",
        us: "Experiment",
        urlPath: "/experiments",
        folderPath: "/experiments",
        index_title: "Experiments",
        view_title: "View Experiment"
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
    idField: 'experiment_id',
    uniqueText: 'experiment_name',
    
    fields: {
        experiment_name: { default: "", fieldType: "string", validations: ["unique", "required"], titleField: true },
        experiment_description: { default: "", fieldType: "string" },
        experiment_steps: { default: "", fieldType: "string", display_type: "", label: true, permissions: ['list-hidden'] },
        experiment_start: { default: "", fieldType: "object", permissions: ['hidden'] },
        
    },
    display: {}
}
