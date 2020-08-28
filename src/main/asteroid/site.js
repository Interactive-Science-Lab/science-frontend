import MenuOption from "./menuOption"
import { menuOptions } from "site/siteSettings"
import Component from './componentClass/component'

/* Essentially, this is just a class to hold all the components, 
just a data structure to keep them all in with a few helpful functions */


export default class Site {
    constructor() {
        this.components = []
        this.menu = []
        this.initializeMenu()
    }

    addComponent = (data) => {
        let component = new Component(data)

        this.components.push(component)
        /*add to menu if any
        component.menuOptions.map(mo => {
            mo.link = component.get('urlPath') + (mo.path || "")
            this.addToMenu(mo)
            return mo
        })*/
    }

    findComponent = (path) => {
        let component = null
        this.components.map(c => {
            if(c.get('friendly') === path) { component = c }
        })
        return component
    }

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

    getMenu = () => {
        return this.menu.sort((a, b) => { return a.order - b.order })
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

}

