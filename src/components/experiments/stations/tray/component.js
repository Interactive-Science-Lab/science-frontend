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
        return <><div id='studentTray' style={{width: this.state.showTray ? '30%' : '15%'}} >
            <div style={{width: this.state.showTray ? '80%' : '0%', display:  this.state.showTray ? 'block' : 'none'}}>
                <DropContainer {...this.props} dropType="drop-section" amount={6} />
            </div>
            <div style={{textAlign:'center', padding: '5px', width: this.state.showTray ? '20%' : '100%', fontSize: '10px'}}>
                
                
                <div className="ttiphover" style={{cursor:'pointer'}}>
                    <h1>?</h1>
                    <p className="ttip">You can store items here when you are not using them.</p>
                </div>
                <div className="ttiphover" onClick={this.toggleTray} style={{cursor:'pointer'}}>
                    <h1>{ this.state.showTray ? <span className="fas fa-arrow-left"></span> : <span className="fas fa-arrow-right"></span> }</h1>
                    <p className="ttip">{ this.state.showTray ? "Hide tray" : "Show tray" }</p>
                </div>
            </div>
        </div>
        <div  style={{width: this.state.showTray ? '0%' : '45%'}}>

        </div>
        </>

    }

}

export default ExperimentLab