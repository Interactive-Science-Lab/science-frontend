import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

//Contains the settings for the resource.
import { ResourceContext, resourceDefaults } from '../../asteroid/contexts/resourceContext'
import { UserContext } from '../../asteroid/contexts/userContext'

import FieldDisplay from '../display/fieldDisplay'


class Show extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {
        }
    }

    render() {
        const item = this.props.item || {}
        const settings = this.settings
        let fields = settings.getItemFields(item)
        const sub = this.props.sub

        //fields = fields.sort((a, b) =>  a.category > b.category )
  

        return <div>
            {sub ? "" : <div>{settings.checkPermission('index', item) ?
                <Link to={`${settings.options?.back_to_all_link ? settings.options.back_to_all_link(item) : settings.get('urlPath')}`}>Back To All</Link>
                : ""}</div>}

            {sub ? <h3>{settings.get('viewTitle')}</h3> : <h1>{settings.get('viewTitle', item)}</h1>}
            <p>{settings.get('viewText')}</p>
            <div className={sub ? "" : 'color-box'}>
                <div>

                    {fields.map(field =>
                        
                        
                        <FieldDisplay key={field.settings.fieldName} settings={settings} action={'view'} field={field} {...this.props} />
                    
                    )}

                </div>

                {item.features ? <div>

                    {Object.entries(item.features).map(i => <SubFeature feature={i} />)}

                </div> : ""}

                {sub ? "" : <div>{settings.checkPermission('edit', item) ?
                    <Link to={`${settings.get('urlPath')}/${settings.getId(item)}/edit`}>Edit</Link>
                    : ""}</div>}
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

class SubFeature extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false
        }
    }

    toggleOpen = () => {
        this.setState({open: !this.state.open})
    }

    render() {
        let feature = this.props.feature
        let settings = this.context.site.findComponent(feature[1].info.names.friendly)

        return <div>
            <h3>{feature[0]} <span onClick={this.toggleOpen}>{this.state.open ? 'cl' : 'op'}</span></h3>
            { this.state.open ? <div>
                {feature[1].items.map((item) => {
                    let fields = settings.getItemFields(item)
                    return <div>
                        {fields.map(field => {
                            return <FieldDisplay settings={settings} action={'view'} field={field} item {...this.props} />

                        })
                        }

                        <Link to={`${settings.get('urlPath')}/${settings.getId(item)}/edit`}>Edit</Link>
                    </div>
                


                })}


                <Link to={`${settings.get('urlPath')}/new`}>Add New</Link>

            </div> : "" }

        </div>

    }
}



Show.contextType = ResourceContext
SubFeature.contextType = UserContext
export default withRouter(Show)

