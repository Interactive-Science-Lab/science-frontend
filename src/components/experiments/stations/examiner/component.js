import React from 'react'
import DropContainer from '../../dropzones/dropContainer';




class Examiner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {


        return <div>
            <div id="examiner">
                <div className="DDcontainer">
                    <DropContainer {...this.props} dropType="drop-row" amount={1} />
                </div>
            </div>

            <div id="examiner" style={{left: '33%'}}>
                <div className="DDcontainer">
                    <DropContainer {...this.props} dropType="drop-row2" amount={1} />
                </div>
            </div>


            {/*<div id="examiner"  style={{left: '66%'}}>
                <div className="DDcontainer">
                    <DropContainer {...this.props} dropType="drop-row3" amount={1} />
                </div>
    </div>*/}


        </div>

    }

}

export default Examiner