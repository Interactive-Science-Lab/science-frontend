import React from 'react'
import BasicField from './basic'


const BooleanField = (props) => {
    return <BasicField {...props} type="checkbox" />
}

export default BooleanField