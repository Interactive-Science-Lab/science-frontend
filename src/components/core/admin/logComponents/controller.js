import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Index from './index.js'


function PageController(props) {
    return <div className="support_ticket-container">
        <Switch>
            <Route path="/logs/" exact component={Index} />

            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <h1>ERROR: 404 Page Not Found</h1> 
                <p>Error Code LOGERROR</p>
            </div></div>} />

        </Switch>
    </div>
}

export default PageController;
