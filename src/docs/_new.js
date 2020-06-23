import React from 'react'
import Component from '../main/component'
import { PermissionSetting } from '../main/permission'

let component = new Component('example') 

component.setLoader({filter: 'public'})
component.setPermissions(new PermissionSetting())

component.turnOnFeature('search')
component.turnOnFeature('paginate')

component.turnOnFeature('filter')
component.setFilterOptions(['draft', 'public', 'private'])

component.turnOnFeature('sort')
component.addSortOption('example_name', "Alphabetical")
component.addSortOption('example_number', "Numerical")

component.turnOnFeature('tags')
component.setFieldOption('tagField', 'example_tags')

component.changeText('newLink', "Add another thing with this button")
component.changeText('indexTitle', "All these fellas")

component.addField('simple_field')
component.addField('text_field_example', {fieldType: 'text'})
component.addField('example_field', {default: "some default", fieldType: "number", permissions: new PermissionSetting() } )

component.setCustomDisplay('index', (items) => { return "Whatever you want in here"})

component.addOption('back_to_all_link', (item) => { return '/wtf/comone'} )
component.addOption('submit_message', (item) => { return "Hey, it's all submitted"} )

export default component
    

const fields = {
        /* The following fields will output custom displays everytime this field is displayed. 
        Index & View will show for those, Display will show for both unless the prior is set
        Same with New, Edit, and form */
        customDisplay: (value) => {
            return `${value}- THATS THE CUSTOM STUFF`
        },
        customForm: (field, callback) => {
            return <div>CUSTOM ENTRY </div>
        },
        customIndex: (value) => {
            return `${value}- THATS THE CUSTOM INDEX`
        },
    }

