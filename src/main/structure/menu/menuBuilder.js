import React from 'react'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import { apiPath } from 'helpers/api'
import { menuOptions } from 'site/siteSettings'

import MenuDropdown from './menuDropdownLink'

import { UserContext } from 'main/asteroid/contexts/userContext'

/*
  This file is responsible for determining & displaying the menu.

  Overall, the menu consists of four parts brought together:
  Site Pages- Created pages like "About Us", etc.
  Site Content- SiteBlogs, all the types
  Custom Links- Any more links as defined in ./structure.js
  Component Menu Formations 

*/

class Menu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  /* Grabs the information for site pages- "About Us", etc. */
  componentDidMount = async () => {
    if (menuOptions.showPages) {
      const pages = await axios.get(apiPath('/pages/menu'))
      this.context.site.addPagesToMenu(pages.data)
    }
  }

  render = () => {
    const menuStructure = this.context.site.getMenu()

    return <div className={`${this.props.showMenu ? "mobile-menu-show" : "mobile-menu-hide"}`}>
      {menuStructure.map(menuOption =>
          menuOption.isDropdown() ? <MenuDropdown key={menuOption.name} menuOption={menuOption} toggleDropdown={this.props.toggleDropdown} /> : menuOption.printLink()
      )}
    </div>
  }
}

Menu.contextType = UserContext
export default withRouter(Menu);
