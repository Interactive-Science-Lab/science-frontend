import React from 'react'
import { Form } from 'react-bootstrap'

class ArrayField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleArrayChange = (e) => {
    const { item, updateItem } = this.props.component.props

    const set = e.target.name.split('-')
    const field = set[0]
    const index = set[1]
    const value = e.target.value 
    const array = item[field] || []
    if (value === "") {
      array.splice(index, 1)
    } else if (value.indexOf(';') > -1) {
      array[index] = value.split(';')[0]
      array[array.length] = ""
    } else {
      array[index] = value
    }
    updateItem({
      ...item,
      [field]: array
    })
  }
  
  field = () => {
    const { field, item } = this.props.component.props
    if (item[field.settings.fieldName] && item[field.settings.fieldName].length > 0) {
      return item[field.settings.fieldName].map((i, index) => <div key={index}>
        <Form.Control
          onChange={this.handleArrayChange}
          type={'text'}
          value={i}
          name={`${field.settings.fieldName}-${index}`} />
        <br />
      </div>)
    } else {
      return <Form.Control onChange={this.handleArrayChange} type='text' placeholder="Start typing" name={`${field.settings.fieldName}-${0}`} />
    }
  }


  render() {
    return <div>
      {this.field()}
      <i>Hit ";" (semicolon) to add a new field, backspace a line to delete one.</i>
    </div>

  }

}

export default ArrayField
