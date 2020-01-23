import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../views/home';

import {allResourceSettings} from 'db/defaultObjects'

import UserComponent from '../components/core/users/controller';

function Body(props) {
    return <div className="body"><div className="page-container">
        <Switch>
            <Route path="/" exact component={Home} />

            {Object.values(allResourceSettings).map(resource => 
                <Route 
                    path={resource.name.urlPath} 
                    component={ require(`../components${resource.name.folderPath}${resource.name.folderName || resource.name.urlPath}/controller.js`).default } 
                />)
            }
        
            <Route path="/users" render={() => <UserComponent {...props} auth={props.auth} />} />

            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <h1>ERROR: 404 Page Not Found</h1>
                <p>This page has been deleted or moved.</p>
                <hr />
                <h3>If you have accessed this page before:</h3>
                <h4>Staff</h4>
                <p>Please try logging out and logging back in.</p>
                <h4>Athletes</h4>
                <p>Please directly message the number for the team.</p>
                <hr />
                <p>Error Code: <i>MISSING_COMPONENT</i></p>
            </div></div>} />

        </Switch>
    </div></div>
}

export default Body;
