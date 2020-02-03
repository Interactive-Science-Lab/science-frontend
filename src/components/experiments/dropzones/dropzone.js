import React from 'react'
import Item from './item'



class Dropzone extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const {dropType, item, i, dropInt} = this.props

        return <div className={ `dropzone ${dropType}` } data-pos={i} data-area={dropInt}>
            <Item {...this.props} />
        </div>
    }

}

export default Dropzone