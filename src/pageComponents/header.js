import React from 'react'
import Menu from './menu/topMenu.js'
import { NavLink, Switch, Route, withRouter } from 'react-router-dom'
import { siteTitle, logoURL } from 'helpers/site'

//An alternate sidebar for displaying the experiments
import ExperimentSidebar from 'components/experiments/sidebar'


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //If the menu is showing, mostly pertaining to mobile
      showMenu: false,
      //If any dropdown is showing.
      showDropdown: false
    }

    document.addEventListener('click', (e) => {
      const className = e.target.className
      const mobileToggleClick = className.indexOf('hmenu-mobile-toggle') >= 0
      const dropdownToggleClick = className.indexOf('hmenu-dropdown-toggle') >= 0
      //If the user is not clicking on a toggle button, then close the menu & dropdown.
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
    const menuPersist = false
    const persistClass = menuPersist ? 'd-xs-none d-lg-none' : ''

    const { showMenu } = this.state
    const showClass = `header ${showMenu || persistClass ? "show-menu" : "hide-menu"}`




    return <div>
      <Switch>
        <Route path="/lab/:id?" >
          <div className='header' >
            <ExperimentSidebar />
          </div>
        </Route>

        {/* In this case, the header is not built on the home path. */}
        <Route path="/" exact>
        </Route>

        <Route path="/">
          <div className={showClass}>
            <br />
            {/* Toggle close button */}
            <h1 className={`fas fa-window-close hmenu-mobile-toggle ${persistClass}`}
              onClick={this.toggleMenu}>
            </h1>

            <br /><br />
            <br />
            {/* Link to home */}
            <NavLink to="/" style={{ background: 'none', marginBottom: '25px' }}>
              <img alt="logo" height="100px" src={logoURL} style={{ marginBottom: '10px' }} /><br />
              <h3 style={{ color: "white" }}>{siteTitle}</h3>
            </NavLink>

            <Menu showMenu={this.state.showMenu} toggleDropdown={this.toggleDropdown} />


          </div>
          {/* Toggle open button */}
          <h2 className={`fas fa-bars hmenu-mobile-toggle d-inline ${persistClass}`}
            onClick={this.toggleMenu}></h2>
        </Route>

      </Switch>



    </div>
  }

}

export default withRouter(Header);

