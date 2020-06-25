import React from 'react'

import String from '../fieldTypes/string'
import TextArea from '../fieldTypes/textArea'
import Select from '../fieldTypes/select'
import Icon from '../fieldTypes/icon'
import LocalImage from '../fieldTypes/localImage'
import ObjectField from '../fieldTypes/objectField'
import ArrayField from '../fieldTypes/array'
import NumberField from '../fieldTypes/number'
import BooleanField from '../fieldTypes/boolean'
import ImageUploadField from '../fieldTypes/imageFile'
import PasswordField from '../fieldTypes/password'

//This component handles all the different field types- hooks up with the individual types and returns the correct types.
class FormFields extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { field } = this.props

        let fieldType = field.settings.fieldType
        if (Array.isArray(fieldType)) { fieldType = fieldType[0] }

        switch (fieldType) {
            case 'string':
                return <String component={this} />
            case 'number':
                return <NumberField component={this} />
            case 'boolean':
                return <BooleanField component={this} />
            case 'text':
            case 'html':
                return <TextArea component={this} />
            case 'select-draft':
            case 'select-open':
            case 'select-custom':
                return <Select component={this} />
            case 'icon':
                return <Icon component={this} />
            case 'local-image':
                return <LocalImage component={this} />
            case 'image':
                return <ImageUploadField component={this} />
            case 'object':
                return <ObjectField component={this} />
            case 'array':
                return <ArrayField component={this} />
            case 'reference':
                return field.settings.referenceType === 'select' ? "REFERENCE SELECT COMING SOON" : null
            case 'password':
                return <PasswordField component={this} />
            default:
                throw new Error(`ASTEROID ERROR: undefined field type- ${fieldType}`)
        }
    }
}

export default FormFields

















