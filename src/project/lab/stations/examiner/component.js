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

        let bigImages = ['Frog', 'Osmosis Cells', 'Diffusion Cells', 
        'Petri Dish With Bacteria A', 'Petri Dish With Bacteria B', "Mitosis Microscope Slides",
        "Blood Antibody Card"]

        if(bigImages.includes(item1.name)) {
            dims = {w1: 50, left: 0, w2: 0, display1: 'block', display2: 'none'}
        }
        else if(bigImages.includes(item2.name)) {
            dims = {w1: 0, left: 0, w2: 50, display1: 'none', display2: 'block'}
        }

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