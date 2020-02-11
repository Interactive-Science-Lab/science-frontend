import React from 'react'
import Item from './item'



class Dropzone extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { dropType, item, i, dropInt } = this.props

        return <div style={{ width: '100%', color:'white'}}>
            
            <span className="waterButton waterHot">
                    &nbsp;H&nbsp;</span> 
            <span style={{position:'relative',display:'inline-block',width:'40px',textAlign:'center'}}><img style={{left: '5px', position:'absolute',bottom:0}} src={"/images/faucet.png"} width='40px' height="80px"/></span>
            <span className="waterButton waterCold">
                    &nbsp;C&nbsp;</span>
            <div style={{ width: '120%', color:'white', border: 'none !important', height: '60%'  }}>
                <div  style={{ border: 'none'  }} className={`dropzone ${dropType}`} data-pos={i} data-area={dropInt}>
                    <Item {...this.props} />
                </div>
            </div>
        </div>
    }

}

export default Dropzone