export default  {
    name: {
        lp: "substances",
        ls: "substance",
        up: "Substances",
        us: "Substance",
        urlPath: "/substances",
        folderPath: "/substances",
        index_title: "Substances"
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
    idField: 'substance_id',
    uniqueText: 'substance_name',
    
    fields: {
        substance_name: { default: "", fieldType: "string", validations: ["unique", "required"], titleField: true },
        substance_density: {  default: "", fieldType: "number", suffix: "g/mL", label: true, permissions: ['list-hidden'] },
        substance_dispense_volume: {  default: "", fieldType: "number", suffix: "mL", label: true, permissions: ['list-hidden'] },
        substance_state_of_matter: { default: "", fieldType: "string", label: true, permissions: ['list-hidden'] },
        substance_scientific_name: { default: "", fieldType: "string", label: true },
        
    },
    display: {}
}
