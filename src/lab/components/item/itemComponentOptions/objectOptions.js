import React from 'react'
import PhysicsExperiment from '../../animations/physicsExperiment'
import OptionButton from './optionButton'

class ItemComponentOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // The "Option Buttons" that appear beneath an item
    render() {
        let item = this.props.item
        let record = item.record

        return <>

            <OptionButton sprite={'trash'} option={'remove-item'} text={'Put Away'} item={this.props.item}  />


            {
                item.name === "Frog" ?
                    <OptionButton sprite={'chevron-right'} option={'advance-graphic'} text={'Dissect'} property={'progress'} item={this.props.item} /> :
                    <OptionButton sprite={'chevron-right'} option={'advance-graphic'} text={'Advance Time'} property={'progress'} item={this.props.item} />
            }


            <OptionButton sprite={'eye-dropper'} option={'reveal-item'} text={'Run Test'} property={'reveal-random'} item={this.props.item} />

            <OptionButton sprite={'chevron-right'} option={'run-atp-item'} text={'Run Cellular Respiration'} property={'atp-factory'} item={this.props.item} />

            {record.properties?.includes('experiment_window') ?
                <span id={`experiment-window-${item.instance_id}`} >
                    <PhysicsExperiment animationKind={record.properties[1]} />
                </span> : ""}

        </>
    }

}

export default ItemComponentOptions