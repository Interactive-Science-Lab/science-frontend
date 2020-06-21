import { PermissionSetting, Permission } from "./permission";

import api, { curr_user, headers, apiPath } from 'helpers/api'
import axios from 'axios'

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

LOADER
The loader pretty much sets what "default" options are set when you first go a page (filter, sort, etc.)

*/



export default class Component {

    constructor(baseName, options={}) {
        const plural = options.plural || baseName + 's'
        const upper = options.upper || baseName.charAt(0).toUpperCase() + baseName.substring(1);
        const friendly = options.friendly || plural

        this.names = {
            lp: baseName + 's',
            ls: baseName,
            up: upper + 's',
            us: upper,
            friendly: friendly,
            urlPath: options.urlPath || "/" + friendly,
        }
        this.fields = {
            idField: baseName + '_id',
            uniqueField: baseName + '_name',
            userReferences: [],
            tagField: null,
            selfId: null,
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
        this.customDisplay = {}
        this.loader = {}
        this.menuOptions = []



    }

    //This is just a shortcut getter function to get commonly used things without tons of dots in code
    get = (shortcut) => {
        switch (shortcut) {
            case "urlPath":
                return this.names.urlPath
            case "friendlyName":
                return this.names.friendly
            case "idField":
                return this.fields.idField
            case "indexTitle":
                return this.text.indexTitle
            case "indexText":
                return this.text.indexText
            case "viewTitle":
                return this.text.viewTitle
            case "viewText":
                return this.text.viewText
            case "editTitle":
                return this.text.editTitle
            case "editText":
                return this.text.editText
            case "newTitle":
                return this.text.newTitle
            case "newText":
                return this.text.newText
        }
    }

    setName = (nameField, text) => { this.names[nameField] = text }
    setPermissions = (permissions) => { this.permissions = permissions }
    setLoader = (loader) => { this.loader = loader }
    addMenuOption = (options) => { this.menuOptions.push(options) }

    addUserReference = (name, options) => { 
        options = {fieldType: 'userReference', default: curr_user?.user_id, ...options}
        this.fields.userReferences.push(name) 
        this.addField(name, options)
    }
    addTags = (tagFieldName, options) => {
        this.turnOnFeature('tags')
        this.setFieldOption('tagField', tagFieldName)
        options = {fieldType: 'array', name: tagFieldName, default: [], ...options}
        this.addField(tagFieldName, options)
    }

    addField = (fieldName, options = {}) => {
        let field = new ComponentField(fieldName, options)
        this.fields.fieldList.push(field)
        return field
    }
    getField = (fieldName) => {
        let ret = null
        this.fields.fieldList.map((i) => i.fieldName === fieldName ? ret = i : null)
        return ret
    }
    //Essentially returns the fields to complete a blank form
    getDefaultFields = () => {
        const return_fields = []

        this.fields.fieldList.map(fieldObject => return_fields.push(
            {
                name: fieldObject.fieldName,
                value: fieldObject.default,
                settings: fieldObject
            }
        ))

        return return_fields
    }

    getDefaultItem = () => {
        let obj = {}
        this.getDefaultFields().map(f => obj[f.name] = f.value)
        return obj
    }
    //Takes in an raw json item and returns the fields for that item based on the above function
    getItemFields = (item) => {
        let defaultFields = this.getDefaultFields()
        let returnFields = []
        defaultFields.map(field => {
            let fieldRet = field
            if( item[field.name] ) { fieldRet = {...fieldRet, value: item[field.name] }}
            returnFields.push(fieldRet)
        
        })
        return returnFields
    }
    addSortOption = (field, displayText) => { this.options.sortOptions.push([field, displayText]) }

    setFilterOptions = (array) => { this.options.filterOptions.options = array }
    setFilterPermissions = (permissions) => { this.options.filterOptions.permissions = permissions}

    setFieldOption = (fieldType, fieldName) => { this.fields[fieldType] = fieldName }

    addOption = (optionName, value) => { this.options[optionName] = value }

    turnOnFeature = (featureName) => { this.features[featureName] = true }
    turnOffFeature = (featureName) => { this.features[featureName] = false }
    changeText = (textType, newInput) => { this.text[textType] = newInput }

    checkPermission = (view, item ={}) => {
        return this.permissions.checkPermission(view, item, this.fields.selfId)
    }

    setCustomDisplay = (view, template) => {
        this.customDisplay[view] = template
    }
    checkCustomDisplay = (view) => {
        return this.customDisplay[view]
    }

    //------------------------------
    // PATHS & URLS 
    //------------------------------
    urlPath = () => { return this.get('urlPath') }
    idPath = (item) => { return this.urlPath() + `/${item[this.get('idField')]}` }
    beUrlPath = () => { return api.apiPath(this.urlPath()) }
    beIdPath = (item) => { return api.apiPath(this.idPath(item)) }

    feIndexPath = () => { return this.urlPath() }
    feNewPath = () => { return this.urlPath() + '/new' }
    feViewPath = (item) => { return this.idPath(item) }
    feEditPath = (item) => { return this.idPath(item) + '/edit' }

    beIndexCall = () => { return axios.get(this.beUrlPath(), headers) }
    beViewCall = (item) => { return axios.get(this.beIdPath(item), headers) }
    beDeleteCall = (item) => { return axios.delete(this.beIdPath(item), headers) }
    beNewCall = (item) => {
        return axios.post(this.beUrlPath(), item, headers)
    }
    beEditCall = (item) => {
        //Grab the path quick first
        const path = this.beIdPath(item)
        //Map over this item to get the things we can call on the db.
        let dbItem = {}
        this.getItemFields(item).map(field => dbItem[field.name] = field.value)
        return axios.put(path, dbItem, headers)
    }

    validateInput = (item) => {
        let ret = true

        //Get the field list from the settings.
        this.fields.fieldList.map(field => {
            //Put the name in a variable and copy the value over.
            let fieldName = field.fieldName
            field = field
            //If there's any validations, loop through them and handle them.
            if (field.validations) {
                field.validations.map(validation => {
                    if (validation === 'required') {
                        ret = ret && item[fieldName] && item[fieldName] != ''
                    }
                })
            }
        })

        return ret
    }


}





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

class ComponentField {
    constructor(fieldName, options = {}) {
        this.fieldName = fieldName
        this.default = options.default === null ? "" : options.default
        this.fieldType = options.fieldType || "string"
        this.permissions = options.permissions
        this.validations = options.validations || []

        this.formInfo = options.formInfo
        this.suffix = options.suffix
        this.label = options.label
        this.titleField = options.titleField

        this.customDisplay = {}

        this.info = options

    }

    checkPermission = (view, item ={}, selfId = null) => {
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
        }

    }

    getValue = () => {

    }
}