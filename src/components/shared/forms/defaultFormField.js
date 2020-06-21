import React from 'react'
import { withRouter } from "react-router-dom";

import { ResourceContext } from 'components/default/components/resourceContext'

import formHelpers from './form_helpers'
import { Form } from 'react-bootstrap'
import FieldType from './fieldTypes'

//This component calls the right field type.
class FormFields extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {}
    }

    render() {
        const { field } = this.props
        return <Form.Group>

                <Form.Label>
                    {field.settings.label ? formHelpers.printifyName(field.name) : null}
                    { /* Add any notes for any fields here */}
                    {field.settings.formInfo}
                </Form.Label>

                <FieldType {...this.props} />


                {field.settings.validations ? field.settings.validations.map(val => <div style={{color:'red'}}>
                    {val === 'required' ? (!field.value || field.value === "" ? "Field is required." : "") : ""}
                </div>) : ""}

            </Form.Group>

    }

}

FormFields.contextType = ResourceContext
export default withRouter(FormFields)

















