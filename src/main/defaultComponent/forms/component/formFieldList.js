import React from 'react'
import { withRouter } from "react-router-dom";


import { ResourceContext } from 'main/asteroid/resourceContext'
import DefaultFormField from './formField'

//This component maps over the fields and controls whether it shows a default form field or the custom.
class FormFields extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {}
    }

    render() {
        let action = this.props.action
        return this.settings.getItemFields(this.props.item).map(field => {

            if(field.settings.checkPermission(action, this.props.item, this.settings.fields.selfId)){
                let customForm = field.settings.checkCustomDisplay(action)

                if(customForm) {
                    return customForm(this.props.updateItem)
                } else {
                    //Essentially we map through each fieldOBJECT and pass through the item
                    return <DefaultFormField field={field} {...this.props} />
                }

            } else {
                return null
            }      

        })
    }
}

FormFields.contextType = ResourceContext
export default withRouter(FormFields)
















