import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from '../../site/home';
import FourOhFour from './404Component'

import AccountComponent from 'main/asteroid/commonComponents/account/controller';
import DefaultComponent from 'main/defaultComponent/controller';
import ExperimentComponent from 'project/experiments/open';

/* 

THIS IS THE MAIN LOGIC FILE 

This is the page that ends up parsing the URL and figuring out where to go

Most traffic will end up going to the default component, unless you override here. 

The home page has it's own route / page



*/


function Body(props) {
	return (
		<Switch>
			{/* HOME PAGE */}
			<Route path="/" exact>
				<div className="">
					<div className="page-container">
						<Home />
					</div>
				</div>
			</Route>

			{/* CUSTOM ROUTES */}
			<Route path="/lab/:id?">
				<div className="body" style={{paddingLeft:'25vw'}}>
					<div className="">
						<ExperimentComponent />
					</div>
				</div>
			</Route>

			{/* LOGIN / LOGOUT / PASSWORD / SIGN UP */}
			<Route path="/auth">
				<div className="body">
					<div className="page-container">
						<AccountComponent />
					</div>
				</div>
			</Route>
			
			{/* Default controller for auto handling each component */}
			<Route path="/:urlPath">
				<div className="body">
					<div className="page-container">
						<DefaultComponent />
					</div>
				</div>
			</Route>

			<Route path="/" component={FourOhFour} />
		</Switch>
	);
}

export default withRouter(Body);
