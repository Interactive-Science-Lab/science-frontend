import React from 'react'
import { Form } from 'react-bootstrap'

class Field extends React.Component {
    constructor(props) {
        super(props)
    }

    handleChange = (e) => {
        this.props.component.props.updateItem({
            ...this.props.component.props.item,
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {field, item} = this.props.component.props
        return <div><Form.Control
            type='text'
            onChange={this.handleChange}
            name={field.settings.fieldName}
            placeholder={field.settings.fieldName}
            value={field.value}
        />
        
        <span className={`fas fa-${field.value}`}></span>
        </div>
    }
}

export default Field