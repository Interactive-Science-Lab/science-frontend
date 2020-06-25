import React from 'react'
import { NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Permission } from "./permission"

export default class MenuOption {
    constructor(options) {
        this.name = options.name
        this.symbol = options.symbol

        this.order = options.order

        this.link = options.link
        this.links = []

        this.permissions = new Permission(options.permission || 'all')
    }

    isDropdown = () => {
        return !this.link
    }

    addLinkAsDropdown = (options) => {
        if (this.isDropdown()) {
            let newLink = new MenuOption(options)
            this.links.push(newLink)
            return newLink
        }
    }

    printLink = () => {
        if (this.permissions.check()) {
            return <NavLink key={this.name} className="hmenu-item" to={this.link || '/'}>
                <span className={`fas fa-${this.symbol}`}></span><span>{this.name}</span>
            </NavLink>
        }
    }

    getLinks = () => {
        return this.links.sort((a,b) => {return a.order - b.order})
    }

    printDropdown = (showMenu, toggleMenuCb) => {
        const ddClass = `hmenu-dropdown-toggle hdt-${this.name}`
        const optionDisplay = { display: (showMenu ? 'block' : 'none') }

        const ItemSymbol = <span className={`${ddClass} fas fa-${this.symbol}`}></span>
        const ArrowDirection = <span className={`${ddClass} fas fa-caret-${showMenu ? 'down' : 'up'} `}></span>

        const DropdownTitle = <>{ItemSymbol} {this.name} {ArrowDirection}</>

        if (this.permissions.check()) {
            return <span className="hmenu-item hmenu-dropdown">
                {/* Actual dropdown item itself */}
                <div className={ddClass} onClick={toggleMenuCb}> {DropdownTitle} </div>
                {/* The dropdown options */}
                <CSSTransition in={showMenu} timeout={100} classNames="menu-fade">
                    <div className="hmenu-dropdown-options" style={optionDisplay}>
                        {this.getLinks().map(link => link.printLink())}
                    </div>
                </CSSTransition>
            </span>
        }
    }
}