import React from 'react'

import axios from 'axios'
import api, { curr_user } from 'helpers/api'
import { withRouter } from 'react-router-dom'

import LabLayout from "./labLayout/labLayout"

import { LabContext } from '../labContext'

import { ItemsState } from '../classes/items/itemsState'

import SoundPlayer from '../classes/sounds/soundPlayer'

//EventListenerHelper contains all the logic for drags and button clicks- very important
import EventListenerHelper from '../classes/eventListeners'

import {labKindHelper} from '../classes/fields'

let soundPlayer = new SoundPlayer()
let eventListenerHelper = null

class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        let labKind = labKindHelper(this.props) 

        this.state = {
            //Class that holds the position of where all the items in the lab are
            itemsState: new ItemsState(),

            hoverPos: {},
            hoverItem: {},
            dragItem: {},

            masterItemList: { objects: [], containers: [], substances: [], tools: [], drawers: [] },

            labType: labKind, 
            
        }
    }

    componentDidMount = async () => {
        //Create the event listeners for the page
        eventListenerHelper = new EventListenerHelper(this, soundPlayer)
        eventListenerHelper.dragListeners();

        //Load the data from the backend
        let objects = await axios.get(api.apiPath('/objects'), curr_user)
        let containers = await axios.get(api.apiPath('/containers'), curr_user)
        let substances = await axios.get(api.apiPath('/substances'), curr_user)
        let tools = await axios.get(api.apiPath('/tools'), curr_user)
        let drawers = await axios.get(api.apiPath('/drawers'), curr_user)
        objects = objects.data
        containers = containers.data
        substances = substances.data
        tools = tools.data
        drawers = drawers.data

        this.setState({ masterItemList: { objects, containers, substances, tools, drawers } })
    }

    componentDidUpdate = async () => {
        eventListenerHelper.dragListeners();
    }

    render() {
        

        return <LabContext.Provider value={
                { 
                    soundEffects: this.state.soundEffects, 
                    masterItemList: this.state.masterItemList, 
                    itemsState: this.state.itemsState, 
                    soundPlayer: soundPlayer,
                    state: this.state 
                }
            }>


            <LabLayout coreComponent={this} soundPlayer={soundPlayer} />

        </LabContext.Provider>
    }

}

export default withRouter(ExperimentLab)


