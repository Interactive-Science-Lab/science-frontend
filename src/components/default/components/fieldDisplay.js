import React from 'react'
import AutoField from './autoField'

//This component is solely responsible for checking if the field should be displayed on a show 
class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { field, action } = this.props

        if (field.settings.checkPermission(action)) {
            const customDisplay = field.settings.checkCustomDisplay(action)
            if (customDisplay) {
                return customDisplay(field.value)
            } else {
                return <AutoField {...this.props} />
            }
        } else {
            return null //Does not have permission.
        }
    }
}

export default Page
