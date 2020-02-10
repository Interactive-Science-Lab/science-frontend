import React from 'react'
import { Form } from 'react-bootstrap'

import formHelpers from '../form_helpers'

export default (props) => {
    const { field, item, callback, type, label, as_setting, settings } = props

    return <Form.Group>

        <Form.Label>
            {label || formHelpers.printifyName(field[0])}
            { /* Add any notes for any fields here */}
            {field[0] === 'height' ? "- In inches" : ""}
            {field[0] === 'weight' ? "- In pounds" : ""}
            {settings && settings[1].fieldType === 'icon' ? <span className={`fas fa-${field[1]}`}></span> : ""}
            {settings && settings[1].fieldType === 'local-image' ? <img src={`/images/${field[1]}`} /> : ""}
        </Form.Label>

        <Form.Control
            type="text"
            onChange={ callback }
            name={field[0]}
            placeholder={field[0]}
            value={JSON.stringify( props.value || item[field[0]])}

            as={"textarea"}
            rows={5}
            
            
            />


        <div>
        </div>


    </Form.Group>
}