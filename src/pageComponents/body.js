import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

/* 

THIS IS THE MAIN LOGIC FILE 

This is the page that ends up parsing the URL

Most traffic will end up going to the default component, unless you override here. 

*/

import Home from '../views/home';

import UserComponent from 'components/core/auth/controller';
import DefaultComponent from 'components/default/controller';
import ExperimentComponent from 'components/experiments/open';

function Body(props) {
	return (
		<Switch>
			<Route path="/" exact>
				<div className="">
					<div className="page-container">
						<Home />
					</div>
				</div>
			</Route>

			<Route path="/lab/:id?">
				<div className="body" style={{paddingLeft:'25vw'}}>
					<div className="">
						<ExperimentComponent />
					</div>
				</div>
			</Route>

			<Route path="/auth">
				<div className="body">
					<div className="page-container">
						<UserComponent />
					</div>
				</div>
			</Route>

			<Route path="/:urlPath">
				<div className="body">
					<div className="page-container">
						<DefaultComponent />
					</div>
				</div>
			</Route>

			<Route
				path="/"
				render={() => (
					<div className="controller">
						<div className="tpBlackBg">
							<h2>We're Sorry</h2>
							<h1>ERROR: 404 Page Not Found</h1>
							<p>This page has been deleted or moved.</p>
							<p>
								Error Code: <i>MISSING_COMPONENT</i>
							</p>
						</div>
					</div>
				)}
			/>
		</Switch>
	);
}

export default withRouter(Body);
