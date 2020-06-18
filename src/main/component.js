import { PermissionSetting, Permission } from "./permission";



/* 

This class controls a "Component"- a REST class

It takes in a baseName and generates all necessary information-

NAMES
example - generates examples, Example, Examples, examples, and /examples

FIELDS
Important fields- generates example_id, example_name, and example_tags

PERMISSIONS
Controls who can see which pages

FEATURES
Turn on & off common features like sorting, search, pagination, etc.

TEXT
Control which text is shown when on the default views.

*/



export default class Component {

    constructor(baseName) {
        const plural = baseName + 's'
        const upper = baseName.charAt(0).toUpperCase() + baseName.substring(1);

        this.names = {
            lp: baseName + 's',
            ls: baseName,
            up: pluralUpper,
            us: upper,
            friendly: plural,
            urlPath: "/" + plural,
        }
        this.fields = {
            idField: baseName + '_id',
            uniqueField: baseName + '_name',
            tagField: baseName + '_tags',
            fieldList: []
        }
        this.permissions = new PermissionSetting('content')
        this.features = {
            paginate: false,
            search: false,
            thumbnail: false,
            newLink: true,
            sort: false,
            filter: false,
            tags: false
        }
        this.options = {
            sortOptions: [],
            filterOptions: { 
                options: [],
                permissions: null
            }
        }
        this.text = {
            newLink: "Add New +",
            indexTitle: "All " + upper + 's',
            indexText: "",
            viewTitle: upper + " Details",
            viewText: "",
            newTitle: "New " + upper,
            newText: "",
            editTitle: "Edit " + upper,
            editText: ""
        }
        this.display = {
            //index: (items) => { return JSON.stringify(items) + "WTFITEMS"}
            //view: (item) => { return JSON.stringify(item) + "WTFITEM"}
            //new: (item) => { return JSON.stringify(item) + "WTFITEM"}
            //edit: (item) => { return JSON.stringify(item) + "WTFITEM"}
            //listItem: (item) => { return JSON.stringify(item) + "WTFITEM"}
        }
        this.loader = {}



    }

    setName = (nameField, text) => { this.names[nameField] = text }
    setPermissions = (permissions) => { this.permissions = permissions }
    setLoader = (loader) => { this.loader = loader }

    addField = (fieldName, options = {}) => { 
        let field = ComponentField.new(fieldName, options)
        this.fields.fieldList.push(field)
    }
    getField = (fieldName) => {

    }
    addSortOption = (field, displayText) => {this.options.sortOptions.push([field, displayText])}

    setFilterOptions = (array) => { this.options.filterOptions.options = array}
    setFilterPermissions = () => {}

    setFieldOption = (fieldType, fieldName) => { this.fields[fieldType] = fieldName }

    turnOnFeature = (featureName) => { this.features[featureName] = true }
    turnOffFeature = (featureName) => { this.features[featureName] = false }
    changeText = (textType, newInput) => { this.text[textType] = newInput }
    


}





/*
        "string"- a string, gives a box
        "text"- a long string, text box
        "boolean"- a boolean, does a checkbox
        "number" 
        "html"
        "object"  
        "text-array"
        "reference" 
        "local-image" 
        "hidden"
        "icon"
        ["select-open"] 
        ["select-draft"] 
        ["select-custom", [[x, X], [y, Y]]
        */

class ComponentField {
    constructor(fieldName, options = {}) {
        this.fieldName = fieldname
        this.default = options.default || ""
        this.fieldType = options.fieldType || "string" 
        this.permissions = options.permissions || new PermissionSetting() 
        this.validations = options.validations || []

        this.formInfo = options.formInfo
        this.suffix = options.suffix
        this.label = options.label
        this.titleField = options.titleField

    }

    getValue = () => {

    }
}