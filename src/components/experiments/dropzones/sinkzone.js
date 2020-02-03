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
            <span className="waterButton waterCold">
                    &nbsp;C&nbsp;</span>
            <div style={{ width: '100%', color:'white', backgroundColor: 'black', border: '10px inset grey', borderBottomWidth: '5px', borderRadius: "8px", borderTopWidth: '30px',  }}>
                <div className={`dropzone ${dropType}`} data-pos={i} data-area={dropInt}>
                    <Item {...this.props} />
                </div>
            </div>
            <span style={{ color:'white' }}>Sink Station</span>
        </div>
    }

}

export default Dropzone