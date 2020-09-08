import MenuItem from "./menuItem"
import {PermissionSetting} from "./permission"
import Component from './componentClass/component'
import {menuOptions} from 'site/siteSettings'

/* 

This is a class & data structure to hold all the components, 
permissions, and menu options.  

This allows access to the whole "site" as an object.

*/


export default class Site {
    constructor() {
        this.components = []
        this.menu = []
        this.permissions = []
    }


    //==============
    //GET FUNCTIONS
    //==============
    getMenu = () => {
        return this.menu.sort((a,b) => a.order - b.order)
    }

    findPermissionById = (id) => {
        let permission = null
        this.permissions.map(c => { if(c.permission_id === id) { permission = c } })
        if(!permission) { throw new Error(`ASTEROID: Unable to find Permission id#:"${id}"`) }
        return permission
    }

    findComponentById = (id) => {
        let component = null
        this.components.map(c => { if(c.component_id === id) { component = c } })
        if(!component) { throw new Error(`ASTEROID: Unable to find Component id#:"${id}"`) }
        return component
    }

    findComponent = (path) => {
        let component = null
        this.components.map(c => { if(c.get('friendly') === path) { component = c } })
        if(!component) { throw new Error(`ASTEROID: Unable to find Component name:"${path}"`) }
        return component
    }


    //==============
    // INITIALIZE
    //==============

    //The "Res" is a call from the backend that has the components, menus, and permissions.
    //We loop over them and call the functions to add them to Site.
    initializeSite = (res) => {
        res = res.data
        res.permissions.map( perm => this.addPermissionType(perm) )
        res.resources.map( resource => this.addComponent(resource) )
        menuOptions.customMenuStructure.map( menu => this.addToMenu(menu) )
        res.menuOptions.map( menuOpt => this.addToMenu(menuOpt) )
    }


    //Simply call the right constructor class add add it into the array.
    addPermissionType = (data) => {
        let permission = new PermissionSetting(data)
        this.permissions.push(permission)
    }
    addComponent = (data) => {
        let component = new Component(data, this)
        this.components.push(component)
    }
    addToMenu = (data) => {
        let menuItem= new MenuItem(data, this)
        this.menu.push(menuItem)
    }
    //====
    

}



/* Apparently extra code for the Menu 
-------------------------------------

initializeMenu = () => {
    //Add all of the menu categories automatically.
    menuOptions.menuCategories.map(mc => this.addToMenu(mc))
    menuOptions.customMenuStructure.map(mo => this.addToMenu(mo))
    //
    //If blogs are enabled,
    if (menuOptions.showBlogs) {
        //If the dropdown is enabled,
        if (menuOptions.blogContentDropdown) {
            //create the dropdown object
            let blogDropdown = this.addToMenu(menuOptions.blogDropdownObject)
            //add the links to the dropdown
            menuOptions.blogContentTypes.map(mc => this.blogParse(mc, blogDropdown.AddLinkAsDropdown))
        }
        //Otherwise add directly to the menu
        else {
            menuOptions.blogContentTypes.map(mc => this.blogParse(mc, this.addToMenu))
        }
    }
}
//
blogParse = (options, callback) => {
    let data = {
        name: options.displayName,
        permission: options.permission,
        link: `/posts?category=${options.categoryName}`,
        symbol: options.symbol
    }
    callback(data)
}

addToMenu = (options) => {
    if (!this.getMenuItem(options)) {
        if (options.category) {
            let category = this.getCategory(options.category)
            if (!category) { throw new Error(`ASTEROID ERROR- site.js- menu category (${options.category}) not found, check siteSettings`) }

            return category.addLinkAsDropdown(options)
        } else {
            let menuOption = new MenuOption(options)
            this.menu.push(menuOption)
            return menuOption
        }
    }
}

getCategory = (category) => {
    let ret = null
    this.menu.map(m => m.name === category ? ret = m : null)
    return ret
}

getMenuItem = (menuOption) => {
    let ret = null
    this.menu.map(m => {
        if(m.link) { if(menuOption.name === m.name && menuOption.link === m.link) {ret = m} } 
        else { m.links.map(md => menuOption.name === md.name && menuOption.link === md.link ? ret = md : null ) }
        return m
    })
    return ret
}

//Map over the result from the backend
addPagesToMenu = (data) => {
    data.map(obj => {
        //parse the backend data over to the convention
        let options = {
            name: obj.page_title,
            permission: "all",
            link: `/pages/${obj.site_page_id}?article=${obj.page_title}`,
            symbol: obj.page_symbol,
            category: obj.page_category,
            order: obj.page_order
        }
        this.addToMenu(options)
        return obj
    })

}
*/