import React from 'react'


import {findResourceSettings} from 'db/defaultObjects'

const resourceSettings = (url) => { return findResourceSettings(url) }
export const resourceDefaults = (url) => { return resourceSettings(url) }
export const ResourceContext = React.createContext({})