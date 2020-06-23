import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

//Contains the settings for the resource.
import { ResourceContext } from '../../asteroid/resourceContext'

import FieldDisplay from '../display/fieldDisplay'


class Show extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {
        }
    }
     
    render() {
        const item = this.props.item
        const settings = this.settings
        const fields = settings.getItemFields(item)
        return <div>
            {settings.checkPermission('index', item) ?
                <Link to={`${settings.options?.back_to_all_link ? settings.options.back_to_all_link(item) : settings.get('urlPath') }`}>Back To All</Link>
                : ""}

             <div>
                    <h1>{settings.get('viewTitle')}</h1>
                    <p>{settings.get('viewText')}</p>

                    {fields.map(field => 
                        <FieldDisplay settings={settings} action={'view'} field={field} {...this.props} />        
                    )}

                </div>



            {settings.features.user_info ? JSON.stringify(item.info) : ""}

            {settings.checkPermission('edit', item) ?
                <Link to={`${settings.get('urlPath')}/${this.props.match.params.id}/edit`}>Edit</Link>
                : ""}
        </div>

    }
}

Show.contextType = ResourceContext
export default withRouter(Show)

