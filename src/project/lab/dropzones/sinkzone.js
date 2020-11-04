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
            
            <div className="sink-controls" style={{marginTop:'-22%', height: '50%'}}>
                <div className="ttipalt" style={{width: '28%', height:'100%'}}>
                        <h1 data-itemType={item.itemType} data-instance={item.instance_id}  className="waterButton waterHot">&nbsp;&nbsp;&nbsp;</h1>
                        <p className="ttip">Dispense 10 ml cold water per click into container.</p>
                </div> 
                

                <div className="ttipalt" style={{width: '28%', height:'100%'}}>
                        <h1  data-itemType={item.itemType} data-instance={item.instance_id} className="waterButton waterCold">&nbsp;&nbsp;&nbsp;</h1>
                        <p className="ttip">Dispense 10 ml hot water per click into container</p>
                </div> 
            </div>


            <div style={{ width: '100%', color:'white', border: 'none !important', height: '80%'  }}>
                <div  style={{ border: 'none'  }} className={`dropzone ${dropType}`} data-pos={i} data-area={dropInt}>
                    <Item {...this.props} />
                </div>
            </div>
        </div>
    }

}

export default Dropzone