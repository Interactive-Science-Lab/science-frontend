import React from 'react'

class Field extends React.Component {
    constructor(props) {
        super(props)
        this.state ={}
    }

    handleChange = (e) => {
        this.props.component.props.updateItem({
            ...this.props.component.props.item,
            [e.target.name]: e.target.value
        })
    }

    options = () => {
        return [ ['', ''], ['objects', 'Objects'], ['substances', 'Substances'], ['tools', 'Tools'], ['containers', 'Containers'] ]
    }

    render() {
        const { field } = this.props.component.props
        return <div>
            <select onChange={this.handleChange} name={field.settings.fieldName} value={field.value}>
                {this.options().map(option => <option value={option[0]}>{option[1]}</option>)}
            </select>
        </div>
    }
}
 
export default Field

