import React from 'react'
import Menu from './menu/topMenu.js'
import { NavLink } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { siteTitle, logoURL } from '../helpers/site'

import ExperimentSidebar from '../components/experiments/sidebar'


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showDropdown: false
    }

    document.addEventListener('click', (e) => {
      const mobileToggleClick = e.target.className.indexOf('hmenu-mobile-toggle') >= 0
      const dropdownToggleClick = e.target.className.indexOf('hmenu-dropdown-toggle') >= 0
      if (!dropdownToggleClick && !mobileToggleClick) {
        this.setState({ showMenu: false, showDropdown: false })
      }
    })
  }

  toggleMenu = (e) => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  toggleDropdown = (value) => {
    this.setState({ showDropdown: value })
  }




  render = () => {

    const user = localStorage.user ? JSON.parse(localStorage.user) : null

    return <div style={{ height: "0px" }}>

      <Switch>
        <Route path="/lab/:id?" >
        <div className={`header ${this.state.showMenu ? "show-menu" : "hide-menu"} `} >
          <ExperimentSidebar />
          </div>
        </Route>
        

        <Route path="/" exact>
        </Route>

        <Route path="/">
        <div className={`header ${this.state.showMenu ? "show-menu" : "hide-menu"} `} >
          <br /><h1 className='fas fa-window-close hmenu-mobile-toggle d-lg-none' onClick={this.toggleMenu}></h1><br />
          <NavLink to="/" style={{ background: 'none', marginBottom:'25px' }}><img alt="logo" height="100px" src={logoURL} style={{marginBottom:'10px'}} /><br />
            <h3 style={{ color: "white" }}>{siteTitle}</h3>
          </NavLink>

          <Menu showMenu={this.state.showMenu} toggleDropdown={this.toggleDropdown} />
          </div>
        </Route>
        
      </Switch>

   
      <br /><h2 className='fas fa-bars hmenu-mobile-toggle d-inline d-lg-none' onClick={this.toggleMenu}></h2></div>
  }

}

export default withRouter(Header);
//
