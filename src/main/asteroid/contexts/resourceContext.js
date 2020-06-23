import React from 'react'
import site from 'site/appComponents'

//This compmonent takes in a phrase/string and searches the siteClass for a component of that name. 
//Will throw an error if it doesn't find it.

const resourceSettings = (url) => { return site.findComponent(url) }
export const resourceDefaults = (url) => { 
    let ret = resourceSettings(url) 
    if(ret) { return ret }
    else { throw `ASTEROID ERROR: cannot find file for: ${url}`}

}
export const ResourceContext = React.createContext({})