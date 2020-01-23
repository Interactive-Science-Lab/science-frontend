import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router'
import Index from './index.js'
import Show from './show.js'
import Edit from './edit.js'
import New from './new.js'


import {findResourceSettings} from 'db/defaultObjects'

class DefaultController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const url = this.props.match.params.urlPath
        const resourceSettings = findResourceSettings(url)
        return <div className="page-container" id={`${url}`}>
        <Switch>
            
            <Route path="/:urlPath" exact render={() => <Index resourceSettings={resourceSettings} />} />

            <Route path="/:urlPath/new" exact component={New} />

            <Route path="/:urlPath/:id" exact render={() => <Show resourceSettings={resourceSettings} />} />

            <Route path="/:urlPath/:id/edit" exact render={() => <Edit resourceSettings={resourceSettings} />} />


            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <h1>ERROR: 404 Page Not Found</h1> 
                <p>Error Code DEFAULTCOMP</p>
            </div></div>} />

        </Switch>
    </div>
    }
}

export default withRouter(DefaultController)



