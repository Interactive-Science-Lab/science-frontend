import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router';
import DemoHome from '../site/demoHome';
import Home from '../site/home';
import FourOhFour from './404Component'

import CoreComponent from 'portal/coreComponents/controller';
import DefaultComponent from 'portal/defaultComponent/controller';
import ExperimentComponent from 'lab/components/core';

import {menuOptions, siteOptions} from 'site/siteSettings'

/* 

THIS IS THE MAIN LOGIC FILE 

This is the page that ends up parsing the URL and figuring out where to go

Most traffic will end up going to the default component, unless you override here. 

The home page has it's own route / page

*/


function Body(props) {
	let labStyle = menuOptions.menuPersist ? {paddingLeft:'0'} : {paddingLeft:'25vw'}
	let user = localStorage.getItem('user')

	return (
		<Switch>
			{/* HOME PAGE */}
			<Route path="/" exact>
				<div className="">
					<div className="page-container">
						{ siteOptions.demoSite ? <DemoHome /> : <Home /> }
					</div>
				</div>
			</Route>

			<Route path="/chemistry">
				<Redirect to="/auth/login"></Redirect>
			</Route>
			
			<Route path="/physics">
				<Redirect to="/auth/login"></Redirect>
			</Route>


			<Route path="/biology">
				<Redirect to="/auth/login"></Redirect>
			</Route>



			{/* CUSTOM ROUTES */}
			<Route path="/lab/:id?">
				<div className="body" style={ labStyle }>
					<div className="">
						{user ? 
						<ExperimentComponent />  : 
						<Route path="/" component={FourOhFour} />}
					</div>
				</div>
			</Route>

			{/* LOGIN / LOGOUT / PASSWORD / SIGN UP */}
			<Route path="/auth">
				<div className="body">
					<div className="page-container">
						<CoreComponent />
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
