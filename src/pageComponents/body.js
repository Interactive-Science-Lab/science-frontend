import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {withRouter} from 'react-router'

import Home from '../views/home';

import {allResourceSettings} from 'db/defaultObjects'

import UserComponent from '../components/core/users/controller';
import DefaultComponent from 'components/default/controller'

function Body(props) {
    return <div className="body"><div className="page-container">
        <Switch>
            <Route path="/" exact component={Home} />
        
            
            <Route path="/:urlPath" component={DefaultComponent} />

            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <h1>ERROR: 404 Page Not Found</h1>
                <p>This page has been deleted or moved.</p>
                <p>Error Code: <i>MISSING_COMPONENT</i></p>
            </div></div>} />

        </Switch>
    </div></div>
}

export default withRouter(Body);
 /*Object.values(allResourceSettings).map(resource => 
                <Route 
                    path={resource.name.urlPath} 
                    component={ require(`../components${resource.name.folderPath}${resource.name.folderName || resource.name.urlPath}/controller.js`).default } 
                />)

            <Route path="/users" render={() => <UserComponent {...props} auth={props.auth} />} />



            */