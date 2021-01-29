import React from 'react'
import Site from 'portal/asteroid/site'

//This is empty here, but it does get assigned other values before being passed into the provider.
export const appDefaults = {site: new Site()}
export const AppContext = React.createContext(siteDefaults);