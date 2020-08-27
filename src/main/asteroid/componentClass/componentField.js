import { PermissionSetting } from "../permission";

/*
        ==Field Types==
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

export default class ComponentField {
    constructor(fieldName, options = {}) {
        console.log(options)
        this.fieldName = fieldName
        this.default = options.default === null ? "" : options.default
        this.fieldType = options.displayType || "string"
        this.permissions = new PermissionSetting('all')
        this.validations = options.validations || []

        this.formInfo = options.formInfo
        this.suffix = options.suffix
        this.label = options.label
        this.titleField = options.titleField

        this.displayName = options.displayName

        this.customDisplay = {}

        this.info = options

    }

    checkPermission = (view, item = {}, selfId = null) => {
        if (this.permissions) {
            return this.permissions.checkPermission(view, item, selfId)
        } else {
            return true
        }
    }

    setCustomDisplay = (view, template) => {
        this.customDisplay[view] = template
    }
    checkCustomDisplay = (view) => {
        switch (view) {
            case "index":
                return this.customDisplay['index'] || this.customDisplay['display']
            case "view":
                return this.customDisplay['view'] || this.customDisplay['display']
            case "edit":
                return this.customDisplay['edit'] || this.customDisplay['form']
            case "new":
                return this.customDisplay['new'] || this.customDisplay['form']
            default: 
                throw new Error(`ASTEROID: Unknown display check- ${view}`)
        }

    }

    printifyName = (componentSettings) => {
        return this.displayName || this.fieldName
            //replaces the "example_" part of "example_name" and "example_case_2"
            .replace(`${componentSettings.names.ls}_`, '')
            //replaces all other underscores with spaces
            .replace(/_/g, ' ')
            //and capitalizes each letter
            .replace(/(?: |\b)(\w)/g, function (key) { return key.toUpperCase() })
    }

    getValue = () => {

    }
}