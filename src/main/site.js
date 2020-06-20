export default class Site {
    constructor() {
        this.components = []

    }

    addComponent = (component) => {
        this.components.push(component)
    }

    findComponent = (path) => {
        let component = null
        this.components.map( c => c.get('friendlyName') === path ? component = c : null )
        return component
    }

    getMenu = () => {
        let ret = []
        //Go through each component,
        this.components.map( c => {
            //Go through each option
            c.menuOptions.map(mo => {
                //create the link
                let link = c.get('urlPath') + ( mo.path || "" )
                ret.push({...mo, link })
            }) 
        }) 
        
        return ret
    }
}

