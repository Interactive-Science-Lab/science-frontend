import React from 'react'
import DropContainer from '../../dropzones/dropContainer';




class Examiner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {


        return <div id="examiner">
                    <div className="DDcontainer">
                        <DropContainer {...this.props} dropType="drop-row" amount={1} />
                    </div>
                    
                </div>
                
    }

}

export default Examiner