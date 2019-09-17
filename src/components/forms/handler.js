import React from 'react'
import axios from 'axios'
import {Form} from 'react-bootstrap'
import { withRouter } from "react-router-dom";


import ArrayField from './fieldTypes/array'
import IdListField from './fieldTypes/idList'
import IdSelectField from './fieldTypes/idSelect'
import ExtraInfoDefaultField from './fieldTypes/extraInfo'

class FormHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      formClass: "",
      existing: props.match.params.id ? true : false
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

  updateInfo = (props = this.props) => {
    this.setState({item: props.item, formClass: props.formClass})
  }

  handleChange = (e) => {
      this.setState({
          item: {
              ...this.state.item,
              [e.target.name]: e.target.value
          }
      })
  }

  handleCheck = (e) => {
      this.setState({
          item: {
              ...this.state.item,
              [e.target.name]: e.target.checked
          }
      })
  }

  handleChangeCb = (field, value) => {
      this.setState({
          item: {
              ...this.state.item,
              [field]: value
          }
      })
  }

  handleArrayChange = (field, array) => {
    this.setState({
          item: {
              ...this.state.item,
              [field]: array
          }
      })
  }

  handleInfoChange = (e) => {
      this.setState({
          item: {
              ...this.state.item,
              extra_info: {
                  ...this.state.item.extra_info,
                  [e.target.name]: e.target.value
              }
          }
      })
  }

  handleExtraInfoChange = (fieldsObject) => {
    this.setState({
        item: {
            ...this.state.item,
            default_extra_info: fieldsObject
        }
    })
  }

  submitForm = (e) => {
    e.preventDefault();
    let item = this.state.item
    if (item.default_extra_info) {
      item = {...item, default_extra_info: JSON.stringify(item.default_extra_info)}
    }
    if(item.extra_info) {
      item = {...item, extra_info: JSON.stringify(item.extra_info)}
    }
    if(this.state.existing) {
      axios
          .put(`http://localhost:4001/api/${this.state.formClass}/${this.props.match.params.id}`, item )
          .then(res =>
            this.props.update()
          )
          .catch(err => console.log(err) )
    } else {
      axios
          .post(`http://localhost:4001/api/${this.state.formClass}`, item)
          .then(res =>
            this.props.update()
          )
          .catch(err => console.log(err) )
    }


  }

  deleteItem = (e) => {
    e.preventDefault()
    if(window.confirm("Are you sure you wish to completely delete the item?")){
      this.props.deleteItem(this.state.item, this.state.formClass)
      this.props.history.push(`/${this.state.formClass}`)
    }
  }

  render() {
    return <Form onSubmit={this.submitForm} style={{width:'800px',margin:'auto'}}>
      <h2>{ this.state.existing ? `Edit` : "Add"}</h2>
      { Object.entries(this.state.item).map(itemField => <div key={itemField[0]}>



                {
                  typeof itemField[1] === 'string' &&  itemField[0].indexOf("_id") <= 0 && itemField[0] !== 'id' && itemField[0].indexOf('_text') === -1  ?
                          <Form.Group>
                    <Form.Label>{ itemField[0].replace('pantheon_', '').replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }) }</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text"
                    name={ itemField[0] } placeholder={ itemField[0] }
                    value={this.state.item[ itemField[0] ]} />
                    </Form.Group>
                  : ""
                }

                {
                  itemField[0].indexOf('_text') >= 0 ?
                  <Form.Group>
                    <Form.Label>{ itemField[0].replace('pantheon_', '').replace('_text', '').replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }) }</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={this.handleChange} type="text"
                      name={ itemField[0] } placeholder={ itemField[0] }
                      value={this.state.item[ itemField[0] ]} />
                  </Form.Group>
                  : ""
                }

                {
                  !Array.isArray(itemField[1]) && itemField[0].indexOf("_id") > 0 ?
                  <IdSelectField item={this.state.item} field={itemField[0]} value={itemField[1]} handleChange={this.handleChangeCb}/>
                  : ""
                }

                {
                  Array.isArray(itemField[1]) && itemField[0].indexOf("_id") > 0 ?
                  <IdListField item={this.state.item} field={itemField[0]} array={itemField[1]} handleArrayChange={this.handleArrayChange}/>
                  : ""
                }

                {
                  Array.isArray(itemField[1]) && itemField[0].indexOf("_id") <= 0 ?
                  <ArrayField item={this.state.item} field={itemField[0]} array={itemField[1]} handleArrayChange={this.handleArrayChange}/>
                  : ""
                 }

                {
                  Number.isInteger(itemField[1]) && itemField[0].indexOf("_id") <= 0 ?
                  <Form.Group>
                  <Form.Label>{ itemField[0].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }) }</Form.Label>
                  <Form.Control onChange={this.handleChange} type="number"
                  name={ itemField[0] } placeholder={ itemField[0] }
                  value={this.state.item[ itemField[0] ]} />
                  </Form.Group>
                  : ""
                }
                {

                  typeof itemField[1] === 'boolean' && itemField[0].indexOf("_id") <= 0 ?
                  <Form.Group>
                  <Form.Label>{ itemField[0].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }) }</Form.Label>

                  <Form.Control onChange={this.handleCheck} type="checkbox"
                  name={ itemField[0] } placeholder={ itemField[0] }
                  checked={this.state.item[ itemField[0] ]} />
                  </Form.Group>
                  : ""
                }

                {
                  itemField[0] === 'extra_info' ?
                    this.state.item.extra_info ?
                     <div>
                      <h5>Collection Related Information</h5>
                      { Object.entries(this.state.item.extra_info).map(i => <Form.Group key={i[0]}>
                          <Form.Label>{i[0].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}</Form.Label>
                          <Form.Control
                              onChange={this.handleInfoChange}
                              name={i[0]} type="text" placeholder={i[0]}
                              value={i[1]} />
                      </Form.Group>) } </div>
                  : "" : ""
                }

                {
                  itemField[0] === 'default_extra_info' ?
                    <span>
                      {JSON.stringify(itemField[1])}
                      <ExtraInfoDefaultField item={this.state.item} fieldsObject={itemField[1]} handleExtraInfoChange={this.handleExtraInfoChange} />
                    </span>
                : ""
                }



      </div>) }


    <button type='submit'>Okie</button>
    <button onClick={this.deleteItem}>Delete</button>

    </Form>
  }


}

export default withRouter(FormHandler)
