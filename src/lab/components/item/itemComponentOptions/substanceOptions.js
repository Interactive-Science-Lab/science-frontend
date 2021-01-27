import React from 'react'
import OptionButton from './optionButton'

class ItemComponentOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // The "Option Buttons" that appear beneath an item
    render() {
        return <>
            <OptionButton sprite={'trash'} option={'remove-item'} text={'Put Away'} item={this.props.item}  />
        </>
    }
}

export default ItemComponentOptions