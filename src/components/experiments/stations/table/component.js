import React from 'react'
import Drawers from './drawers/component'

import DropContainer from '../../dropzones/dropContainer';


class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {


        return <div id="wholeTable" >

        
            <div id="tableTop">
                
                <div id="tableLeft">
                    <DropContainer {...this.props} dropType="drop-column" amount={6} />
                </div>
                <div id="tableSink">
                    <DropContainer {...this.props} dropType="drop-sink" amount={1} />
                </div>
            </div>
            <Drawers />

        </div>

    }

}

export default ExperimentLab