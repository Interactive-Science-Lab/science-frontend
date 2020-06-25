import React from 'react'
import { Form } from 'react-bootstrap'

class Field extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    handleChange = (e) => {
        let value = {}
        try { value = JSON.parse(e.target.value) }
        catch { console.log("That is not valid JSON, failed parse.") }

        this.props.component.props.updateItem({
            ...this.props.component.props.item,
            [e.target.name]: value
        })
    }

    render() {
        const {field} = this.props.component.props
        return <Form.Control
            type='text'
            as='textarea'
            rows={5}
            onChange={this.handleChange}
            name={field.name}
            placeholder={field.name}
            value={ JSON.stringify(field.value) }
        />
    }
}

export default Field