import React from 'react'
import customMenuStructure from './structure'
import MenuItem from './menuItem'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import {apiPath} from '../../helpers/api'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site_pages: []
    }
  }

  componentDidMount = async () => {
    const pages = await axios.get(apiPath('/pages/menu'))
    console.log(pages)
    this.setState({site_pages: pages.data})
  }

  sitePagesCategories = [
    //['Features', '', 'all'], 
    ['About', 'exclamation', 'all']
  ]
  siteBlogTypes = [
    ["News & Updates", 'News', 'newspaper'], 
    // ["News & Updates", 'News', 'newspaper'], 
    // ["Projects Built", 'Project', 'star'], 
  ]

  sitePagesStructure = () => {
    let returnStructure = []
    this.sitePagesCategories.map(category => {
      let categoryDropdown = { name: category[0], view: category[2], symbol: category[1] }
      let dropdownOptions = []
      this.state.site_pages.map(page => {
        if(page.page_category === category[0]) {
          dropdownOptions.push({name: page.page_title, view: "all", link: `/pages/${page.site_page_id}?article=${page.page_title}`, symbol: page.page_symbol})
        }
      })
      categoryDropdown.links = dropdownOptions
      returnStructure.push(categoryDropdown)
    })
    console.log(returnStructure[0])
    return returnStructure[0].links //if only one category, you can use "[0].links" to display the pages directly in the bar
  }

  siteContentStructure = () => {
    let returnStructure = { name: "Content", view: "all", symbol: "box" }
    let dropdownOptions = []
    this.siteBlogTypes.map(name => dropdownOptions.push({name: name[0], view: 'all', link: `/posts?category=${name[1]}`, symbol: name[2] }))
    returnStructure.links = dropdownOptions
    
    return dropdownOptions // or return dropdownOptions OR [returnStructure] 
  }



  render = () => {

    const menuStructure = [...this.sitePagesStructure(), ...this.siteContentStructure(),  ...customMenuStructure, ]

    return <div className={`${this.props.showMenu ? "mobile-menu-show" : "mobile-menu-hide"}`}>
      {menuStructure.map(item => 
        <MenuItem auth={this.props.auth} item={item} toggleDropdown={this.props.toggleDropdown} />        
      ) } 
    </div>
  }
}

export default withRouter(Menu);
