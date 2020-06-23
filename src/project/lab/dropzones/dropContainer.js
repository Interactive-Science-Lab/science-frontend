import React from 'react'
import Dropzone from './dropzone';
import Sinkzone from './sinkzone';

import { LabContext } from 'project/lab/labContext'


class ExperimentLab extends React.Component {
    static contextType = LabContext
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let { amount, dropType } = this.props
        const items = this.context.itemsState

        let dropInt = 0

        switch (dropType) {
            case "drop-section":
                dropInt = 1;
                break;
            case "drop-row":
                dropInt = 2;
                break;
            case "drop-row2":
                dropType = 'drop-row'
                dropInt = 3;
                break;
            case "drop-row3":
                dropType = 'drop-row'
                dropInt = 4;
                break;
            case "drop-column":
                dropInt = 5;
                break;
            case "drop-sink":
                dropInt = 6;
                break;
        }
        let containerItems = items.list.filter(i => i.area === dropInt)

        let dropzones = []

        for (var i = 0; i < amount; i++) {
            dropzones[i] = containerItems.filter(j => j.pos === i)[0] || {}
        }
        return <div class="DDcontainer">
            {
            dropType === 'drop-sink' ? 
            dropzones.map((item, i) => <Sinkzone item={item} i={i} dropInt={dropInt} {...this.context} {...this.props} />) : 
            dropzones.map((item, i) => <Dropzone {...this.props} item={item} i={i} dropInt={dropInt}  dropType={dropType} {...this.context}  />)
            }

        </div>

    }

}

ExperimentLab.contextType = LabContext
export default ExperimentLab