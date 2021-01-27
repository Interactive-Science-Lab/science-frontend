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
            <OptionButton sprite={'trash'} option={'remove-item'} text={'Put Away'} item={this.props.item} />

            <OptionButton sprite={'filter'} option={'split-item'} text={'Suck Up'} property={'scoop'} item={this.props.item} />
            <OptionButton sprite={'sync'} option={'combine-strain-item'} text={'Combine'} property={'scoop'} item={this.props.item} />


            <OptionButton sprite={'filter'} option={'strain-item'} text={'Strain'} property={'strain'} item={this.props.item} />
            <OptionButton sprite={'sync'} option={'combine-strain-item'} text={'Combine'} property={'strain'} item={this.props.item} />
            
            <OptionButton sprite={'fire'} option={'heat-item heat-hi'} text={'Heat'} property={'heatsource-flame'} item={this.props.item} />

            <OptionButton sprite={'stopwatch'} option={'time-item time-lo'} text={'5 Secs'} property={'timer'} item={this.props.item} />
            <OptionButton sprite={'clock'} option={'time-item time-mid'} text={'1 Min'} property={'timer'} item={this.props.item} />
            <OptionButton sprite={'clock'} option={'time-item time-hi'} text={'10 Min'} property={'timer'} item={this.props.item} />
        </>
    }

}

export default ItemComponentOptions