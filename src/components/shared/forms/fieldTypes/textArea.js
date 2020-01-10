import React from 'react'
import BasicField from './basic'

import formHelpers from '../form_helpers'

const Field = (props) => {
    const {field} = props

    return <BasicField {...props} 
                type="text"
                as_setting="textarea" 
                label={formHelpers.printifyName(field[0]).replace('Text', '')} />
}

export default Field