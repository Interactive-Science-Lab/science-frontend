import React from 'react';
import { siteTitle, logoURL } from '../helpers/site'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { curr_user } from 'helpers/api'

function Home(props) {
	const squares = [
		{
			title: "Sign Up",
			link: "/auth/register"
		},
		{
			title: "Student Log In",
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
		alignItems: 'center',
		background: 'linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.8),rgba(255,255,255,.4))',
		borderRadius: '20px'
		}}>
		<div>

		<h1>College Prep Science</h1>
		<hr />
			<Row>
				<Col lg={3}>
					<img alt="logo" height="150px" src={logoURL} />
				</Col>
				<Col lg={9}>
					{curr_user ? <div>
					<h4></h4>
					<h2>Welcome back!</h2>
					<h4></h4>
					</div> : <div>
					<h4>Presents</h4>
					<h2>{siteTitle}</h2>
					<h4>An online, interactive science lab allowing you to perform experiments in your browser</h4>
					</div> }
					
				</Col>
			</Row>

			<hr />

					{curr_user ?
						<div>
							<Link className="nice-button" to='/lab'><h3>Go To Lab</h3></Link>
						</div> :
						squares.map(({ title, link }) =>
							<div>
								<Link className="nice-button" to={link}><h3>{title}</h3></Link>
							</div>)}



		</div>
	</div>
}

export default Home;
