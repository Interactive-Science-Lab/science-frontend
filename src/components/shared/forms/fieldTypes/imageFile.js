import React from 'react'
import {Form} from 'react-bootstrap'
import {Input} from 'reactstrap'

const Field = (props) => {
    const {item, field, callback} = props
    return <Form.Group>
        <img src={item.image_preview_url ? item.image_preview_url : field[1] } height="50px" alt={item.image_title} /><br />
        <Form.Label>Image</Form.Label>
        <Input type="file" name={'image_raw'} onChange={callback} />
    </Form.Group>
}

export default Field