import React from 'react'
import { withRouter } from "react-router-dom";


import { ResourceContext } from 'main/defaultComponent/components/resourceContext'
import DefaultFormField from './defaultFormField'

//This component maps over the fields and controls whether it shows a default form field or the custom.
class FormFields extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {}
    }

    render() {
        let action = this.props.existing ? 'edit' : 'new'
        return this.settings.getItemFields(this.props.item).map(field => {
            if(field.settings.checkPermission(action, this.props.item, this.settings.fields.selfId)){
                let customForm = field.settings.checkCustomDisplay(action)
                if(customForm) {
                    return customForm(this.props.updateItem)
                } else {
                    return <DefaultFormField field={field} settings={this.settings} item={this.props.item} {...this.props} />
                }
            }
            return null
        })
    }
}

FormFields.contextType = ResourceContext
export default withRouter(FormFields)

















