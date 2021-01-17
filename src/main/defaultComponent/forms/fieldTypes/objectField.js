import React from 'react'
import { Form } from 'react-bootstrap'

class Field extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    handleValidity = (incomingJSON) => {
        const fieldProps = this.props.component.props
        const field = fieldProps.field


        fieldProps.updateItem({
            ...fieldProps.item,
            [field.settings.fieldName]: incomingJSON
        })

    }

    handleKeyChange = (e) => {
        let { value, name } = e.target

        const fieldProps = this.props.component.props
        const field = fieldProps.field
        let wholeValue = field.value

        let thisValue = document.getElementById(`${name}-value`).value

        wholeValue[value] = thisValue
        delete wholeValue[name]

        this.handleValidity(wholeValue)
    }


    handleValueChange = (e) => {
        let { value, name } = e.target

        const fieldProps = this.props.component.props
        const field = fieldProps.field
        let wholeValue = field.value

        wholeValue[name] = value

        this.handleValidity(wholeValue)
    }

    addField = () => {
        let value = this.props.component.props.field.value || {}
        value.field0 = ""

        this.handleValidity(value)
    }

    deleteField = (e) => {
        let value = this.props.component.props.field.value
        let name = e.target.getAttribute('data-name')
        delete value[name]

        this.handleValidity(value)
    }

    render() {
        const { field } = this.props.component.props
        let obj = field.value || {}

        return <>

            {Object.entries(obj).map(line => {
                return <div>

                    <div style={{ width: '40%', display: 'inline-block' }}>
                        <Form.Control type='text'
                            onChange={this.handleKeyChange}
                            name={`${line[0]}`}
                            id={`${line[0]}-key`}
                            value={line[0]}
                        />
                    </div>

                    <div style={{ width: '40%', display: 'inline-block' }}>
                        <Form.Control type='text'
                            onChange={this.handleValueChange}
                            name={`${line[0]}`}
                            id={`${line[0]}-value`}
                            value={line[1]}
                        />
                    </div>

                    <div style={{ width: '10%', display: 'inline-block' }}>
                        <span style={{cursor: 'pointer'}} onClick={this.deleteField} data-name={line[0]}>Delete (x)</span>
                    </div>

                </div>
            })}

            <span style={{cursor: 'pointer'}} onClick={this.addField}>Add New Field (+)</span>
        </>
    }
}

export default Field