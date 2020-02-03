import React from 'react'

import objects from './objects'
import containers from './containers'
import substances from './substances'
import itemsState from './list'

const masterItemList = {objects, containers, substances}

export const labDefaults = {masterItemList, itemsState};
export const LabContext = React.createContext(labDefaults);