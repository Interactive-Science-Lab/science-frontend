import React from 'react'

export default class Popup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false
        }
    }


    toggle = () => {
        this.setState({open: !this.state.open})
    }

 

    render = () => {
        let mainStyle = {
            position:'fixed', 
            width: 'min-content', 
            zIndex: '100',
            top: '0',
            background: `url('${'/images/techbg.jpg'}')`, 
            backgroundSize: "cover",
            border: '4px outset #000077',
            borderRadius: '4px',
        }
        

        let xStyle = {
            fontSize: '18px', 
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
                <div style={{maxHeight: '90vh', overflowY: "scroll"}}>
                <span onClick={this.toggle} style={xStyle} className='fas fa-times'> </span>
                <div style={childStyle}> 
                {this.props.children}
                </div>
                </div>
            </div> : ""}

            <span onClick={this.toggle} className={'format-link lab-action fas fa-play'}> 
            
            <span>Open</span>
            
            
            </span>
        </span>
    }

}