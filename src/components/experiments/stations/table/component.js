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


        return <div id="wholeTable" style={{position:'relative'}}>

<div className="ttiphover" style={{ cursor: 'pointer' }}>
                            <h1>?</h1>
                            <p className="ttip" style={{top: '-30px', bottom: 'auto'}}>This is the table. Drop items here to make them easiser to work with, and either clean them or put them away.</p>
                        </div>
            <div id="tableTop">
                
                <div id="tableLeft">
                    <DropContainer {...this.props} dropType="drop-column" amount={3} />
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