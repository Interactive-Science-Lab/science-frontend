import React from 'react'
import DropContainer from '../../dropzones/dropContainer';




class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showTray: true,
        }
    }

    toggleTray = () => {
        this.setState({showTray: !this.state.showTray})
    }

    render() {
        return <><div id='studentTray' style={{width: this.state.showTray ? '60%' : '15%'}} >
            <div style={{width: this.state.showTray ? '80%' : '0%', display:  this.state.showTray ? 'block' : 'none'}}>
                <DropContainer {...this.props} dropType="drop-section" amount={8} />
            </div>
            <div style={{textAlign:'center', padding: '5px', width: this.state.showTray ? '20%' : '100%', fontSize: '10px'}}>
                Hold items here<br />
                ?<br />
                <i>Materials Tray</i>
                <div onClick={this.toggleTray} style={{cursor:'pointer'}}>
                    <h1>{ this.state.showTray ? "<" : ">" }</h1>
                    { this.state.showTray ? "close" : "open" }
                </div>
            </div>
        </div>
        <div  style={{width: this.state.showTray ? '0%' : '45%'}}>

        </div>
        </>

    }

}

export default ExperimentLab