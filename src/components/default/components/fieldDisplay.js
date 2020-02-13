import React from 'react'
import settingHelper from 'db/settingHelpers'
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

        if (settingHelper.checkFieldPermission(action, field.settings[1].permissions)) {
            const customDisplay = settingHelper.customFieldDisplay(action, field.settings[1])
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
