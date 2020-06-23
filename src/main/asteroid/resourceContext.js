import React from 'react'

import site from 'site/appComponents'

const resourceSettings = (url) => { return site.findComponent(url) }
export const resourceDefaults = (url) => { 
    let ret = resourceSettings(url) 
    if(ret) { return ret }
    else { throw `ASTEROID ERROR: cannot find file for: ${url}`}

}
export const ResourceContext = React.createContext({})