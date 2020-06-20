import React from 'react'

import site from 'main/app'

const resourceSettings = (url) => { return site.findComponent(url) }
export const resourceDefaults = (url) => { return resourceSettings(url) }
export const ResourceContext = React.createContext({})