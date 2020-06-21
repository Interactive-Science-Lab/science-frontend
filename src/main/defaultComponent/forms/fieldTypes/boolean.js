import React from 'react'
import { Form } from 'react-bootstrap'

class Field extends React.Component {
    constructor(props) {
        super(props)
    }
    
    handleChange = (e) => {
        this.props.component.props.updateItem({
            ...this.props.component.props.item,
            [e.target.name]: e.target.checked
        })
    }

    render() {
        const {field, item} = this.props.component.props
        return <Form.Control
            type='checkbox'
            onChange={this.handleChange}
            name={field.name}
            placeholder={field.name}
            value={item[field.name]}
        />
    }
}

export default Field