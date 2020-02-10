import React from 'react'



export const labDefaults = { masterItemList: {objects: [], containers: [], substances: []}, itemsState: []};
export const LabContext = React.createContext(labDefaults);