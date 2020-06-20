import React from 'react'
import customMenuStructure from './structure'
import MenuItem from './menuItem'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import { apiPath } from 'helpers/api'
import { menuOptions } from 'helpers/site'

import site from 'main/app'

/*
  This file is responsible for determining & displaying the menu.

  Overall, the menu consists of three parts brought together:
  Site Pages- Created pages like "About Us", etc.
  Site Content- SiteBlogs, all the types
  Custom Links- Any more links as defined in ./structure.js

*/

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Site pages are stored in the database similar to Wordpress, here they are stored in state. */
      site_pages: []
    }
  }

  /* Grabs the information for site pages- "About Us", etc. */
  componentDidMount = async () => {
    if (menuOptions.showPages) {
      const pages = await axios.get(apiPath('/pages/menu'))
      this.setState({ site_pages: pages.data })
    }
  }

  /* Builds the menu structure for pages */
  sitePagesStructure = () => {
    let returnStructure = []
    if (menuOptions.showPages) {
      menuOptions.pageCategories.map(category => {
        let categoryDropdown = { name: category.name, view: category.view, symbol: category.symbol }
        let dropdownOptions = []
        this.state.site_pages.map(page => {
          if (page.page_category === category.name) {
            dropdownOptions.push({ 
              name: page.page_title, 
              view: "all", 
              link: `/pages/${page.site_page_id}?article=${page.page_title}`, 
              symbol: page.page_symbol 
            })
          }
        })
        categoryDropdown.links = dropdownOptions
        returnStructure.push(categoryDropdown)
      })

      if(menuOptions.usePageCategories) {
        return returnStructure 
      } else {
        return returnStructure[0].links
      }

    } else {
      return []
    }
  }

  /* Builds the menu structure for site content. */
  siteContentStructure = () => {
    //First, check to see if the menuOption to show them is set
    if (menuOptions.showBlogs) {
      let returnStructure = menuOptions.blogDropdownObject
      //Will store the "links" 
      let dropdownOptions = []

      menuOptions.blogContentTypes.map(
        (i) =>
          dropdownOptions.push({
            name: i.displayName,
            view: i.view,
            link: `/posts?category=${i.categoryName}`,
            symbol: i.symbol
          })
      )

      returnStructure.links = dropdownOptions

      if (menuOptions.blogContentDropdown) {
        return [returnStructure]
      } else {
        return dropdownOptions
      }
    } else {
      return []
    }
  }

  siteComponentStructure = () => {
    let retCategories = []
    let retLinks = []

    //Parse all the categories from the helper/site file
    menuOptions.componentCategories.map(category => {
      retCategories.push({...category, links: []})
    })
    
    //Call the site's getMenu function, and map over that, adding to the correct category, or the top menu
    site.getMenu().map(menuItem => {
      if(menuItem.category) {
        retCategories.map(cat => menuItem.category === cat.id ? cat.links.push(menuItem) : null)
      } else {
        retLinks.push(menuItem)
      }
    })

    //Sort order links WITHIN categories
    retCategories.map(rc => rc.links = rc.links.sort((a, b) => a.order - b.order))

    //Add the categories to the links, and sort order again
    return retLinks.concat(retCategories).sort((a, b) => a.order - b.order)
  }



  render = () => {

    
    const menuStructure = [...this.sitePagesStructure(), ...this.siteContentStructure(), ...customMenuStructure, ...this.siteComponentStructure() ]

    return <div className={`${this.props.showMenu ? "mobile-menu-show" : "mobile-menu-hide"}`}>
      {menuStructure.map(item =>
        <MenuItem item={item} toggleDropdown={this.props.toggleDropdown} />
      )}
    </div>
  }
}

export default withRouter(Menu);
