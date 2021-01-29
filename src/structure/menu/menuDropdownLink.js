import React from 'react'
import { withRouter } from 'react-router-dom'

//Controls state for a dropdown menu

class DropdownOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }

    document.addEventListener('click', (e) => {
      const mobileToggleClick = e.target.className.indexOf('hmenu-mobile-toggle') >= 0
      const dropdownToggleClick = e.target.className.indexOf(`hdt-${this.props.menuOption.name}`) >= 0
      if (!dropdownToggleClick && !mobileToggleClick) {
        this.setState({ showMenu: false })
      }
    })
  }

  toggleMenu = (e) => {
    this.setState({ showMenu: !this.state.showMenu })
    this.props.toggleDropdown(!this.state.showMenu)
  }

  render = () => {
    const showMenu = this.state.showMenu
    const menuOption = this.props.menuOption
    return menuOption.printDropdown(showMenu, this.toggleMenu) || ""
  }
}

export default withRouter(DropdownOption);
