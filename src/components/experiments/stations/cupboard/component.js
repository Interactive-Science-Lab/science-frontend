import React from 'react'

import {LabContext} from 'components/experiments/db/labContext'

import Shelf from './shelf'



class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const {masterItemList} = this.context

        return <div id="shelveSection">
            <Shelf list={masterItemList.objects} side={'left'} itemType={'objects'} />
            <Shelf list={masterItemList.containers} side={'right'} itemType={'containers'} />
        </div>
    }

}

ExperimentLab.contextType = LabContext
export default ExperimentLab