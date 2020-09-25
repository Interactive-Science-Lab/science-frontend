import React from 'react'
import DropContainer from '../../dropzones/dropContainer';



import { LabContext } from 'project/lab/labContext'


class Examiner extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {

        }
    }

    render() {

        let item1 = this.context.itemsState.getPosition({pos: 0, area: 2})
        let item2 = this.context.itemsState.getPosition({pos: 0, area: 3})


        let dims = { w1: 30, w2: 30, left: 33, display1: 'block', display2: 'block'}

        if(item1.name === 'Frog') {
            dims = {w1: 66, left: 0, w2: 0, display1: 'block', display2: 'none'}
        }
        else if(item2.name === 'Frog') {
            dims = {w1: 0, left: 0, w2: 66, display1: 'none', display2: 'block'}
        }

        console.log(this.context.itemsState, dims, item1, item2, item1.display_name === 'Frog', item2.display_name === 'Frog')

        return <div>
            <div id="examiner" style={{width: `${dims.w1}%`, display: `${dims.display1}`, }}>
                <div className="DDcontainer">
                    <DropContainer {...this.props} dropType="drop-row" amount={1} />
                </div>
            </div>

            <div id="examiner" style={{width: `${dims.w2}%`, left: `${dims.left}%`, display: `${dims.display2}`}}>
                <div className="DDcontainer">
                    <DropContainer {...this.props} dropType="drop-row2" amount={1} />
                </div>
            </div>
        </div>

    }

}

Examiner.contextType = LabContext
export default Examiner