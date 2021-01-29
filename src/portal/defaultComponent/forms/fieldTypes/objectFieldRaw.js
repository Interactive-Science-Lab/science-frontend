import React from 'react'
import { Form } from 'react-bootstrap'

class Field extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            validJSON: false,
            value: '{}'
        }
    }

    componentDidMount = () => {
        let value = JSON.stringify(this.props.component.props.field.value)
        this.handleValidity(value)
    }

    handleValidity = (incomingJSON) => {
        let value = incomingJSON
        let valid = true
        const fieldProps = this.props.component.props
        const field = fieldProps.field

        if (value) {
            try { valid = JSON.parse(value) }
            catch { valid = false }
        }

        this.setState({ validJSON: !!valid, value: value })

        if(valid && value && (value !== field.value) ) {
            fieldProps.updateItem({
                ...fieldProps.item,
                [field.settings.fieldName]: value
            })
        }
    }

    handleChange = (e) => {
        let value = e.target.value
        this.handleValidity(value)
    }

    render() {
        const { field } = this.props.component.props
        return <>
            <Form.Control
                type='text'
                as='textarea'
                rows={5}
                onChange={this.handleChange}
                name={field.settings.fieldName}
                placeholder={field.settings.fieldName}
                value={this.state.value}
            />

            {this.state.validJSON ? "" : <span style={{ color: 'red' }}>WARNING: Invalid JSON.</span>}

        </>
    }
}

export default Field