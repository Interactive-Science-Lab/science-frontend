import React from 'react'
import { NavLink } from 'react-router-dom'

export default class MenuItem {
    constructor(data, site) {
        this.displayText = data.displayText
        this.permissions = site.findPermissionById( data.permission_id || 1)

        //There are two ways to build the link.
        //You can provide a direct link.
        if (data.link) {
            this.link = data.link
        } 
        //Or you can provide a resource/action and it builds it.
        else if(data.parent_resource_id && data.action) { 
            this.link = "/" + site.findComponentById(data.parent_resource_id).get('friendly') + this.parseAction(data.action)
        }
        
        this.symbol = data.symbol || 'circle'
    }


    parseAction = (action) => {
        switch(action) {
            case 'index':
                return ''
            case 'new':
                return '/new'
        }
    }

    isDropdown = () => { return false }

    printLink = () => {
        if (this.permissions.checkPermission('view')) {
            return <NavLink key={this.name} className="hmenu-item" to={this.link || '/'}>
                <span className={`fas fa-${this.symbol}`}></span><span>{this.displayText}</span>
            </NavLink>
        }
    }

    
    
}