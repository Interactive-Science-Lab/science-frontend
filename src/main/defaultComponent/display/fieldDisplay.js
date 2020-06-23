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
        console.log(field, this.props.item)
        if (field.settings.checkPermission(action, this.props.item, this.props.settings.fields.selfId) ) {
            const customDisplay = field.settings.checkCustomDisplay(action)
            if (customDisplay) {
                return customDisplay(this.props.item)
            } else {
                return <AutoField {...this.props} />
            }
        } else {
            return null //Does not have permission.
        }
    }
}

export default Page
