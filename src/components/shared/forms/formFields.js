import React from 'react'
import { withRouter } from "react-router-dom";


import { resourceFullFields } from 'db/defaultObjects'
import settingHelper from 'db/settingHelpers'
import { ResourceContext } from 'components/default/components/resourceContext'
import DefaultFormField from './defaultFormField'

//This component maps over the fields and controls whether it shows a default form field or the custom.
class FormFields extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {}
    }

    render() {
        return resourceFullFields(this.settings, this.props.item).map(field => {
            if(settingHelper.checkFieldPermission('edit', field.settings)){
                if(field.settings[1].customForm) {
                    return field.settings[1].customForm(field, this.handleChange)
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

















