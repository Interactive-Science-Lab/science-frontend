import { PermissionSetting } from "../permission";
import ComponentField from './componentField'
import ComponentFeature from './componentFeature'
import ComponentReference from './componentReference'

import api, { headers } from 'helpers/api'
import axios from 'axios'

/* 

This class controls a "Component"- a REST class

It takes in a baseName and generates all necessary information-

NAMES
example - generates examples, Example, Examples, examples, and /examples

PERMISSIONS
Controls who can see which pages

FIELDS
Important fields- generates example_id, example_name, and example_tags

REERENCES
Fields that connect with another record

FEATURES
Turn on & off common features like sorting, search, pagination, etc.

TEXT
Control which text is shown when on the default views.

LOADER
The loader pretty much sets what "default" options are set when you first go a page (filter, sort, etc.)

*/



export default class Component {

    constructor(baseName, options = {}) {
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
            selfId: null,

            userReferences: [],
            tagField: null,
            fieldList: []
        }
        this.permissions = new PermissionSetting('content')
        this.features = {
            thumbnail: false,
            tags: false
        }
        this.features = []
        // paginate: false,
        // search: false,
        // sort: false,
        // filter: false,

        //Options holds things like:
        // simple true/false things like newLink: true 
        // override links & stuff like that
        this.options = {
            //This option will not move you away from a form.
            blockFormRedirect: false,
            //This option will override where it redirects when a form is successfully submitted.
            formRedirectPath: null,
            //This changes whether or not a "delete" option is "confirmed" with a popup window
            confirmDelete: true,
            newRedirect: (item) => { return this.feEditPath(item) },
            editRedirect: (item) => { return this.feViewPath(item) },
            deleteRedirect: this.get('urlPath'),


        }
        this.text = {
            indexTitle: "All " + upper + 's',
            indexText: "",
            viewTitle: upper + " Details",
            viewText: "",
            newTitle: "New " + upper,
            newText: "",
            editTitle: "Edit " + upper,
            editText: "",
            newLink: "Add New +",
            newSubmit: "Add",
            editLink: "Edit",
            editSubmit: "Submit",
            deleteLink: "Delete",
            deleteWarning: "Are you sure you wish to completely delete the item?",
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
            default:
                throw new Error(`Incorrect selection for 'get'- ${shortcut}`)
        }
    }
    getId = (item) => {
        return item[this.get('idField')]
    }

    setName = (nameField, text) => { this.names[nameField] = text }
    setPermissions = (permissions) => { this.permissions = permissions }
    setLoader = (loader) => { this.loader = loader }
    setFieldOption = (kind, name) => { this.fields[kind] = name }

    addMenuOption = (options) => { this.menuOptions.push(options) }


    addTags = (tagFieldName, options) => {
        options = { fieldType: 'array', name: tagFieldName, default: [], ...options }
        this.addField(tagFieldName, options)
    }


    addReference = (idField, targetField, referenceType, options) => {
        let reference = new ComponentReference(idField, targetField, referenceType, options)
        this.fields.fieldList.push(reference)
        return reference
    }
    getControlReferences = () => {
        let ret = []
        this.fields.fieldList.map(fl => fl.referenceType === 'control' ? ret.push(fl) : null)
        return ret
    }

    /* Field functions- for defining which fields are important & how they display */
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

    //Returns the fields with a value
    getDefaultFields = () => {
        return this.fields.fieldList.map(fL => ({ settings: fL, value: fL.default }))
    }

    //Returns a JSON object of name/value pairs for a "new" item
    getDefaultItem = () => {
        let obj = {}
        this.getDefaultFields().map(f => obj[f.settings.fieldName] = f.value)
        return obj
    }

    //Takes in an raw json item and returns the fields for that item based on the above function
    getItemFields = (item) => {
        let defaultFields = this.getDefaultFields()
        let returnFields = []
        defaultFields.map(field => {
            let fieldRet = field
            if (item[field.settings.fieldName]) { fieldRet.value = item[field.settings.fieldName] }
            returnFields.push(fieldRet)
            return field
        })
        return returnFields
    }

    addFeature = (name, options = null, permissions = null) => {
        let feature = new ComponentFeature(name, options, permissions)
        this.features.push(feature)
    }

    feature = (name) => {
        let retFeature = null
        this.features.map(f => f.name === name ? retFeature = f : null)
        return retFeature
    }

    addUserReference = () => { }
    addSortOption = () => { }

    setFilterOptions = () => { }
    setFilterPermissions = () => { }

    

    turnOnFeature = () => { }
    turnOffFeature = () => { }


    addOption = (optionName, value) => { this.options[optionName] = value }
    changeText = (textType, newInput) => { this.text[textType] = newInput }

    checkPermission = (view, item = {}) => {
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
        this.getItemFields(item).map(field => dbItem[field.settings.fieldName] = field.value)
        return axios.put(path, dbItem, headers)
    }

    validateInput = (item) => {
        let ret = true

        //Get the field list from the settings.
        this.fields.fieldList.map(field => {
            //Put the name in a variable and copy the value over.
            let fieldName = field.fieldName
            //If there's any validations, loop through them and handle them.
            if (field.validations) {
                field.validations.map(validation => {
                    if (validation === 'required') {
                        ret = ret && item[fieldName] && item[fieldName] !== ''
                    }
                    return validation
                })
            }
            return field
        })

        return ret
    }


}





