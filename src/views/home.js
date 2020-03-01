import React from 'react';
import { siteTitle, logoURL } from '../helpers/site'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { curr_user } from 'helpers/api'

function Home(props) {
	const squares = [
		{
			title: "Physics",
			link: "/auth/login?class=physics2020"
		},
		{
			title: "Chemistry",
			link: "/auth/login?class=chemistry2020"
		},
		{
			title: "Biology",
			link: "/auth/login?class=biology2020"
		},
		{
			title: "Anatomy",
			link: "/auth/login?class=anatomy2020"
		}
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
		<h1>College Prep Science</h1>

					{curr_user ? <div>
					<h4></h4>
					<h2>Welcome back!</h2>
					<h4></h4>
					</div> : <div>
					<h2>Lab Portal</h2>
					</div> }
					

					{curr_user ?
						<div>
							<Link className="nice-button" to='/lab'>
								<h3>Go To {curr_user.user_kind === 'end_user' ? ['', 'Biology', 'Chemistry', 'Physics'][curr_user.user_role] + ' ' : ''}Lab</h3>
							</Link><br />
							<Link className="nice-button" to='/feedback/new'><h3>Contact</h3></Link><br />
							{ curr_user.user_kind === 'admin_user' ? <div>
							<Link className="nice-button" to='/experiments'><h3>Admin Settings</h3></Link></div> : ""}
							<Link className="nice-button" to='/auth/logout'><h3>Logout</h3></Link>
						</div> :
						squares.map(({ title, link }) =>
							<div>
								<Link className="nice-button" to={link}><h3>{title}</h3></Link>
							</div>)}



		</div>
	</div>
}

export default Home;
