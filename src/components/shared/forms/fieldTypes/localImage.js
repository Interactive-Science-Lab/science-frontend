import React from 'react'
import { Form } from 'react-bootstrap'

class Field extends React.Component {
    constructor(props) {
        super(props)
    }

    handleChange = (e) => {
        this.props.component.props.updateItem({
            ...this.props.item,
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { field, item } = this.props.component.props
        return <div><Form.Control
            type='text'
            onChange={this.handleChange}
            name={field.name}
            placeholder={field.name}
            value={item[field.name]}
        />
            <img src={`/images/${field[1]}`} />
        </div>
    }
}

export default Field