import React from 'react'

import String from './fieldTypes/string'
import TextArea from './fieldTypes/textArea'
import Select from './fieldTypes/select'
import Icon from './fieldTypes/icon'
import LocalImage from './fieldTypes/localImage'
import ObjectField from './fieldTypes/objectField'
import ArrayField from './fieldTypes/array'
import NumberField from './fieldTypes/number'
import BooleanField from './fieldTypes/boolean'
import ImageUploadField from './fieldTypes/imageFile'

//This component should handle all the different field types.
class FormFields extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { field } = this.props

        let fieldType = field.settings.fieldType
        if (Array.isArray(fieldType)) { fieldType = fieldType[0] }

        if (['string'].includes(fieldType)) { return <String component={this} /> }
        else if (['text', 'html'].includes(fieldType)) { return <TextArea component={this} /> }
        else if (['select-draft', 'select-open', 'select-custom'].includes(fieldType)) { return <Select component={this} /> }
        else if (['icon'].includes(fieldType)) { return <Icon component={this} /> }
        else if (['local-image'].includes(fieldType)) { return <LocalImage component={this} /> }
        else if (['object'].includes(fieldType)) { return <ObjectField component={this} /> }
        else if (['array'].includes(fieldType)) { return <ArrayField component={this} /> }
        else if (['number'].includes(fieldType)) { return <NumberField component={this} /> }
        else if (['boolean'].includes(fieldType)) { return <BooleanField component={this} /> }
        else if (['image'].includes(fieldType)) { return <ImageUploadField component={this} /> }
    }
}

export default FormFields

















