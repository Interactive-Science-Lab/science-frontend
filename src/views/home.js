import React from 'react';
import {siteTitle, logoURL} from '../helpers/site'
import {Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'

function Home(props) {
	const squares = [
		{
			title: "See Features",
			link: "/users/register"
		},
		{
			title: "Contact Developer For Install",
			link: "/users/login"
		},
	]

	return <div style={{maxWidth:'800px',margin:'40px auto',textAlign:'center'}}>
		
		
		<h4>SimpleBlog is a...</h4>
		<h1>{siteTitle}</h1>
		<h3>-functionality comparable to WordPress</h3>
		<h3>-easier to use</h3>
		<h3>-faster for the end user</h3>

		built on node/react<br />


			{squares.map(({title, link}) => 
			<div>
					<Link className="nice-button" to={link}><h3>{title}</h3></Link>
			</div>)}
		<hr />

	</div>
}

export default Home;
