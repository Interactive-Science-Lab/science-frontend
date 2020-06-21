import React from 'react';
import './site/App.scss';
import Helmet from 'react-helmet'

import Header from './main/structure/header';
import Body from './main/structure/body';

import { siteTitle, siteTagline } from './site/siteSettings'
import { UserContext, userDefaults } from 'main/asteroid/userContext'
 
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: userDefaults.user,
			token: userDefaults.token
		};
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
		return <UserContext.Provider value={{ ...this.state, logout: this.logout, login: this.login }}>
			<div className="App main-bg">
				<Header />
				<div className="main-screen">
					<Helmet><title>{`${siteTitle}- ${siteTagline}`}</title></Helmet>
					<Body />	
				</div>
			</div>
		</UserContext.Provider>
	}
}

export default App;
