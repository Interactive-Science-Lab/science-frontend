import React from 'react'

class OptionButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // The "Option Button" that appears beneath an item
    render() {
        let {sprite, option, text, property, item} = this.props
        let display = true
        if (property) {
            display = item.record.properties?.indexOf(property) > -1
        }

        if (display) {
            return <span>
                <span 
                data-instance={item.instance_id} 
                className={`format-link lab-action fas fa-${sprite} ${option}`}>
                    {text === "Run Test" ? " " + text : ""} <span>{text}</span>
                </span>
            </span>
        } else {
            return ""
        }

    }

}

export default OptionButton