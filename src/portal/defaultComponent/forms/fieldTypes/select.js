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
        const field = this.props.component.props.field
        switch( field.settings.fieldType[0] ){
            case "select-draft":
                return [ ['draft', 'Draft'], ['public', 'Public'], ['private', 'Private'] ]
            case 'select-open':
                return [ ['pending', 'Pending'], ['open', 'Open'], ['closed', 'Closed'], ['solved', 'Solved'], ['repoened', 'Reopened'] ]
            case "select-custom":
                return field.settings.fieldType[1]
            default:
                throw new Error("ASTEROID: Unrecognied select type.")
        }
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