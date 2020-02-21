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

        return <div style={{ width: '100%', color:'white', position: 'relative'}}>
            
            <div className="sink-controls" style={{marginLeft:'-25px'}}>
                <span className="ttipalt">
                        <h1 className="waterButton waterHot">&nbsp;H&nbsp;</h1>
                        <p className="ttip">Dispense 10mL hot water into the glass.</p>
                </span> 
                        
                <span style={{position:'relative',display:'inline-block',width:'40px',textAlign:'center'}}><img style={{left: '5px', position:'absolute',bottom:0}} src={"/images/faucet.png"} width='40px' height="80px"/></span>

                <span className="ttipalt">
                        <h1 className="waterButton waterCold">&nbsp;C&nbsp;</h1>
                        <p className="ttip">Dispense 10mL cold water into the glass.</p>
                </span> 
            </div>


            <div style={{ width: '100%', color:'white', border: 'none !important', height: '60%'  }}>
                <div  style={{ border: 'none'  }} className={`dropzone ${dropType}`} data-pos={i} data-area={dropInt}>
                    <Item {...this.props} />
                </div>
            </div>
        </div>
    }

}

export default Dropzone