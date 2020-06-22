import React from 'react'
import { withRouter } from "react-router-dom";

import { ResourceContext } from 'main/defaultComponent/componentParts/resourceContext'

import { Form } from 'react-bootstrap'
import FieldType from './fieldTypes'

//This component calls the right field type.
class FormFields extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.componentSettings = this.context
        this.state = {}
    }

    render() {
        const { field } = this.props
        return <Form.Group>

                <Form.Label>
                    {field.settings.label ? field.settings.printifyName(this.componentSettings) + '- ' : null}
                    { /* Add any notes for any fields here */}
                    {field.settings.formInfo}
                </Form.Label>

                <FieldType {...this.props} />


                {field.settings.validations ? field.settings.validations.map(val => <div style={{color:'red'}}>
                    {val === 'required' ? (field.value === undefined || field.value === null || field.value === "" ? "Field is required." : "") : ""}
                </div>) : ""}

            </Form.Group>

    }

}

FormFields.contextType = ResourceContext
export default withRouter(FormFields)

















