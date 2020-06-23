import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

/* 

This is the controller for all components that are using the default options. 

This file has a few major responsibilities:
1) Pull the component settings and put it into a context
2) Link to the default index, view, edit, new funtionality; which ends up linking to the BE


*/

import Index from './index/indexController.js'
import View from './view/viewController.js'
import Edit from './edit/editController.js'
import New from './new/newController.js'
import FourOhFour from 'main/structure/404Component'


import { ResourceContext, resourceDefaults } from '../asteroid/contexts/resourceContext'


class DefaultController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        //Get the url and the settings based off of that. These go into a context to be used.
        const url = this.props.match.params.urlPath
        const resourceSettings = resourceDefaults(url)
        if(!resourceSettings) { throw "ASTEROID: Unable to find resource settings file."}

        //Double check to make sure we have the settings. If not, most likely a typo on the url, so display a 404.
        if (resourceSettings) {
            return <ResourceContext.Provider value={resourceSettings}>
                <div className="page-container" id={`${url}`}>
                    <Switch>
                        <Route path="/:urlPath" exact component={Index} />
                        <Route path="/:urlPath/new" exact component={New} />
                        <Route path="/:urlPath/:id" exact component={View} />
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



