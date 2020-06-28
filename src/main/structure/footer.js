import React from 'react'
import {NavLink} from 'react-router-dom'
import {siteTitle, logoURL} from '../../site/siteSettings'

import {menuOptions} from 'site/siteSettings'
let labStyle = menuOptions.menuPersist ? {paddingLeft:'25vw'} : {paddingLeft:'0'} 

function Footer() {
    return <div className='footer' style={labStyle}>
      
        <div>
         ~ <NavLink to="/">Home</NavLink> ~
        <NavLink to="/pages/features">Features</NavLink> ~
        <NavLink to="/feedback/provide">Contact/Report</NavLink> ~
        </div>


        <h1>
          <img alt="logo" height="50px" src={logoURL} />
          <br />{siteTitle}  
        </h1>


        <NavLink to="/pages/privacy-policy">Our Privacy Policy</NavLink><br />
        <a href="https://www.google.com/policies/privacy/partners/">How Google Analytics uses data when you use our app</a><br />
      
        

    </div>
}

export default Footer;
