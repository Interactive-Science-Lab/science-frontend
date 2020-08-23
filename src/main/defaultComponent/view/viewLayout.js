import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

//Contains the settings for the resource.
import { ResourceContext, resourceDefaults } from '../../asteroid/contexts/resourceContext'

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
        const sub = this.props.sub

        console.log("ITEM", item, "SETTINGS", settings)

        return <div>
            {sub ? "" : <div>{settings.checkPermission('index', item) ?
                <Link to={`${settings.options?.back_to_all_link ? settings.options.back_to_all_link(item) : settings.get('urlPath')}`}>Back To All</Link>
                : ""}</div> }

            {sub ?  <h3>{settings.get('viewTitle')}</h3> : <h1>{settings.get('viewTitle')}</h1> }
            <p>{settings.get('viewText')}</p>
            <div className={ sub ? "" : 'color-box' }>
                <div>

                    {fields.map(field =>
                        <FieldDisplay key={field.settings.fieldName} settings={settings} action={'view'} field={field} {...this.props} />
                    )}

                </div>

                { item.features ? <div>
                    
                    FEATURES:
                    {Object.entries(item.features).map(i => <div> 
                        <h3>{i[0]}</h3>
                        {JSON.stringify(i[1].info)} 
                        <div>
                            {i[1].items.map(item => <div> { JSON.stringify(item) } </div> )}
                        </div>
                        
                    </div>)}
                    
                    </div> : ""}

                {sub ? "" : <div>{settings.checkPermission('edit', item) ?
                    <Link to={`${settings.get('urlPath')}/${settings.getId(item)}/edit`}>Edit</Link>
                    : ""}</div> }
            </div>
        </div>

    }

    userInfo = (item) => {
        const resourceSettings = resourceDefaults(`${item.user_kind}s`)
        if (!resourceSettings) { throw new Error("ASTEROID: Error with user kind.") }

        //Double check to make sure we have the settings. If not, most likely a typo on the url, so display a 404.
        return <ResourceContext.Provider value={resourceSettings}>
            {/** {JSON.stringify(item)}<br /><hr />{JSON.stringify(resourceSettings)} */}
            <Show item={item.info} sub={true} />
        </ResourceContext.Provider>

    }
}

Show.contextType = ResourceContext
export default withRouter(Show)

