import React from 'react';
import './App.scss';

import Helmet from 'react-helmet'
import Header from './pageComponents/header';
import Body from './pageComponents/body';

import { siteTitle, siteTagline } from './helpers/site'
import { UserContext, userDefaults } from 'helpers/userContext'
 
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
