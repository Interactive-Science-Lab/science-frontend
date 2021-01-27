import React from 'react'
import { LabContext } from 'lab/labContext'

class Popup extends React.Component {
    static contextType = LabContext
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }


    toggle = () => {
        if(this.state.open) { this.context.state.sounds.remove.play(this.context.state) }
        this.setState({ open: !this.state.open })
    }

    stopDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }



    render = () => {
        let mainStyle = {
            position: 'fixed',
            width: 'min-content',
            zIndex: '100000',
            top: '0',
            background: `url('${'/images/techbg.jpg'}')`,
            backgroundSize: "cover",
            border: '4px outset #000077',
            borderRadius: '4px',
        }


        let xStyle = {
            right: "0",
            color: 'white',
            position: 'absolute',
            cursor: 'pointer',
            background: "rgba(27,43,56, .3)",
            border: '2px solid #222',
            padding: '5px 7px',
            borderRadius: '100%',
            margin: '5px'
        }

        let childStyle = {
            padding: '40px 20px 20px',
            background: 'rgba(27,43,56, .8)'
        }


        return <span>
            {this.state.open ? <div style={mainStyle}>
                <div style={{ maxHeight: '90vh', cursor: 'default' }} draggable="true" onDragStart={this.stopDrag}>
                    <span onClick={this.toggle} style={xStyle} className={'fas fa-times close-sound-effect'}> </span>
                    <div style={childStyle}>
                        {this.props.children}
                    </div>
                </div>
            </div> : ""}

            <span style={{ cursor: 'pointer' }} onClick={this.toggle} className={'format-link lab-action fas fa-play run-physics'}>
                <span style={{ cursor: 'pointer' }} >Open</span>
            </span>

        </span>
    }

}

Popup.contextType = LabContext
export default Popup