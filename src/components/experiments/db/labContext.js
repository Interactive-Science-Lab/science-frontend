import React from 'react'

export const labDefaults = { masterItemList: {objects: [], containers: [], substances: [], tools: []}, itemsState: []};
export const LabContext = React.createContext(labDefaults);