import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Index from './index.js'
import Show from './show.js'
import Edit from './edit.js'
import New from './new.js'
import FourOhFour from 'helpers/404Component'

import { ResourceContext, resourceDefaults } from './components/resourceContext'


class DefaultController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        //Get the url and the settings based off of that. These go into a context to be used.
        const url = this.props.match.params.urlPath
        const resourceSettings = resourceDefaults(url)

        //Double check to make sure we have the settings. If not, most likely a typo on the url, so display a 404.
        if (resourceSettings) {
            return <ResourceContext.Provider value={resourceDefaults(url)}>
                <div className="page-container" id={`${url}`}>
                    <Switch>
                        <Route path="/:urlPath" exact component={Index} />
                        <Route path="/:urlPath/new" exact component={New} />
                        <Route path="/:urlPath/:id" exact component={Show} />
                        <Route path="/:urlPath/:id/edit" exact component={Edit} />

                        {/* Have the 404 again here in case the urlPath is right, but the rest of the url is not. */}
                        <Route path="/" component={FourOhFour} />
                    </Switch>
                </div>
            </ResourceContext.Provider>
        } else {
            return <FourOhFour />
        }
    }
}

export default withRouter(DefaultController)



