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

        if (settingHelper.checkFieldView(action, field.settings[1].permissions)) {
            if (field.settings[1].customDisplay) {
                return field.settings[1].customDisplay(field.value)
            } else {
                return <AutoField {...this.props} />
            }
        } else {
            return null //Does not have permission.
        }
    }
}

export default Page
