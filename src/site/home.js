import React from 'react';
import { logoURL } from '../site/siteSettings'
import { Link } from 'react-router-dom'
import { curr_user } from 'helpers/api'

function Home(props) {
	const squares = [
		{
			title: "Average Velocity Demo Lab - Click Here to Try It",
			link: "/auth/login"
		},
	]

	return <div style={{ 
		maxWidth: '800px', 
		margin: '40px auto', 
		padding: '20px',
		textAlign: 'center', 
		minHeight: '65vh', 
		display: 'flex', 
		justifyContent: 'center', 
		background: 'radial-gradient(white, transparent, transparent)',
		alignItems: 'center',
		borderRadius: '20px',
		borderTop: '8px solid white',
		borderBottom: '8px solid white',
		}}>
		<div>

		<img alt="logo" height="150px" src={logoURL} />
		<h3>Professor Landry's</h3>
		<h1>Virtual Science Lab</h1>

					{curr_user ? <div>
					<br />
					<h2>Welcome back!</h2>
					<br />
					</div> : <div>
					<h2>Lab Portal</h2>
					</div> }
					

					{curr_user ?
						<div>
							
							<Link className="nice-button" to={`/lab`}>
								<h3>Demo Lab</h3>
							</Link><br />

							{ curr_user.user_kind === 'admin_user' ? <div>
							<Link className="nice-button" to='/experiments'><h3>Admin Settings</h3></Link></div> : ""}
							<Link className="nice-button" to='/auth/logout'><h3>Logout</h3></Link>
						</div> :
						squares.map(({ title, link }) =>
							<div key={title}>
								<Link className="nice-button" to={link}><h3>{title}</h3></Link>
							</div>)}



		</div>
	</div>
}

export default Home;
