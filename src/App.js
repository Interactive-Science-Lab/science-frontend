import React from 'react';
import './stylesheets/App.scss';
import Helmet from 'react-helmet'
import { withRouter } from 'react-router';

import Header from './main/structure/header';
import Footer from './main/structure/footer';
import Body from './main/structure/body';

import { siteTitle, siteTagline, siteOptions, menuOptions } from './site/siteSettings'
import { UserContext, userDefaults } from 'main/asteroid/contexts/userContext'
import { curr_user, expireTokenCheck, apiPath } from 'helpers/api'
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			resources: [],
			menuOptions: [],
			permissions: [],
			loading: true,
			user: userDefaults.user,
			token: userDefaults.token
		};
	}

	componentDidMount = async () => {
		//This checks to see if a user's login is expired, logs them out, or just goes on. 
		if (curr_user) { if (expireTokenCheck()) { this.logout() } }

		axios.get(apiPath('/site')).then(res => {
			this.setState({ resources: res.resources, menuOptions: res.menuOptions, permissions: res.permissions, loading: false })
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
					<div>Loading...</div>
					: <div>
						<Header />
						<div className={`main-screen ${leftMarginShow ? 'main-screen-persist-menu' : null}`} >
							<Helmet><title>{`${siteTitle}- ${siteTagline}`}</title></Helmet>
							<Body />
							{siteOptions.displayFooter ? <Footer /> : ""}
						</div>
					</div> }
			</div>
		</UserContext.Provider>
	}
}

export default withRouter(App);
