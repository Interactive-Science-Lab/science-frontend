import React from 'react';
import './stylesheets/App.scss';
import Helmet from 'react-helmet'
import { withRouter } from 'react-router';
import { logoURL } from './site/siteSettings'

import Header from './structure/header';
import Footer from './structure/footer';
import Body from './structure/body';

import { siteTitle, siteTagline, siteOptions, menuOptions } from './site/siteSettings'
import { UserContext, userDefaults } from 'portal/asteroid/contexts/userContext'
import { curr_user, expireTokenCheck, apiPath } from 'helpers/api'

import Site from './portal/asteroid/site'
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
		//This is like the Superstate of the app.
		this.state = {
			//SiteComponents, Permissions, and MenuObjects
			site: new Site(),
			//Whether or not the app is loading. Default set to true, then set false once done loading.
			loading: true,
			//Logged in user info.
			user: userDefaults.user,
			token: userDefaults.token
		};
	}

	componentDidMount = async () => {
		//This checks to see if a user's login is expired, logs them out, or just goes on. 
		if (curr_user) { if (expireTokenCheck()) { this.logout() } }

		axios.get(apiPath('/site')).then(res => {
			let site = this.state.site
			site.initializeSite(res)
			this.setState({ site, loading: false })
		})
	}

	logout = () => {
		localStorage.setItem('user', null);
		localStorage.setItem('token', null);
		this.setState({ user: {}, token: null });
		window.location.replace('/?loggedIn=false');
	};

	login = (user, token) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
		this.setState({ user, token });
		this.forceUpdate();
	};

	//App handles the user context, the placement of header & body, and a dynamic title bar.
	render() {

		//This returns false if user is currently on the home page && the setting menuOnHome is true
		let homeShow = (this.props.location.pathname === "/" ? menuOptions.menuOnHome : true)
		let leftMarginShow = homeShow && menuOptions.menuPersistff

		return <UserContext.Provider value={{ ...this.state, logout: this.logout, login: this.login }}>
			<div className="App main-bg">
				{this.state.loading ?
					loadingScreenHtml
					: <div>
						<Header />
						<div className={`main-screen ${leftMarginShow ? 'main-screen-persist-menu' : null}`} >
							<Helmet><title>{`${siteTitle}- ${siteTagline}`}</title></Helmet>
							<Body />
							{siteOptions.displayFooter ? <Footer /> : ""}
						</div>
					</div>}
			</div>
		</UserContext.Provider>
	}
}

let loadingScreenHtml = <div style={{ height: '100vh', width: '100vw' }} >
	<div style={{ height: '200px', position: 'relative' }}>
		<img src={`/images/load.gif`} style={{ position: 'absolute', width: '164px', height: '164px', marginLeft: '-82px', marginTop: '32px' }} />
		<img alt="logo" src={logoURL} style={{ position: 'absolute', width: '64px', height: '64px', marginLeft: '-32px', marginTop: '82px' }} />
	</div>

	<h1>College Prep Science</h1>
	<h2>
		<img src={`/images/rev-ell-load.gif`} style={{ height: '12px' }} /> Loading Online Lab <img src={`/images/ellipse-load.gif`} style={{ height: '12px' }} />
	</h2>
</div>

export default withRouter(App);
