import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { resourceFullFields } from 'db/defaultObjects'
import AutoField from './autoField'

//Contains the settings for the resource.
import { ResourceContext } from './resourceContext'
//Contains the helpers for the settings.
import settingHelper from 'db/settingHelpers'

class Show extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {
            loading: false
        }
    }
     
    render() {
        const item = this.props.item
        const settings = this.settings
        console.log(settings)
        const fields = resourceFullFields(settings, item)
        return <div>
            {settingHelper.checkRender('index', settings) ?
                <Link to={`${settings.options?.back_to_all_link(item) || settings.name.urlPath}`}>Back To All</Link>
                : ""}

            {settingHelper.checkRender('view', settings) ? (settings.display.page ?
                settings.display.page(item) : <div>

                    <h1>{settings.name.view_title}</h1>
                    {Object.values(fields).map(field => <AutoField settings={settings} displayType={'view'} field={field} {...this.props} />)}

                </div>) : ""}



            {settings.features.user_info ? JSON.stringify(item.info) : ""}

            {settingHelper.checkRender('edit', settings) ?
                <Link to={`${settings.name.urlPath}/${this.props.match.params.id}/edit`}>Edit</Link>
                : ""}
        </div>

    }
}

Show.contextType = ResourceContext
export default withRouter(Show)

