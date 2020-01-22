import React from 'react';
import {siteTitle, logoURL} from '../helpers/site'
import {Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'

function Home(props) {
	const squares = [
		{
			title: "See Features",
			link: "/pages/1"
		},
		{
			title: "Sign Up",
			link: "/users/register"
		},
	]

	return <div style={{maxWidth:'800px',margin:'40px auto',textAlign:'center'}}>
		
		
		<h4>Simple blog is a </h4>
		<h1>{siteTitle}</h1>
		<h3>Making blogging easy & fast</h3>
		<h3>Ability to extend custom functionality</h3>

			{squares.map(({title, link}) => 
			<div>
					<Link className="nice-button" to={link}><h3>{title}</h3></Link>
			</div>)}
		<hr />

	</div>
}

export default Home;
