import React from 'react'
import { LabContext } from 'lab/labContext'
import axios from 'axios'
import api from 'helpers/api'

class ArrayField extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      object_type: this.props.component.props.item.object_type || 'objects',
      objects: []
    }
  }

  componentDidMount = () => {
    this.loadPage()
  }

  componentDidUpdate = async (pProps, pState) => {

    let objectTypeChange = pState.object_type !== this.props.component.props.item.object_type
    let objectArrayChange = false
    

    if (objectArrayChange || objectTypeChange) {
      await this.setState({ object_type: this.props.component.props.item.object_type })
      this.loadPage()
    }

  }

  //Most of the magic happens here. We verify the Loader & params, and do the necessary calls based on the Features for the resource.
  loadPage = async () => {

    //Make the api call 
    const res = await axios.get(api.apiPath('/' + this.state.object_type))



    this.setState({ objects: res.data })
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

  removeFromArray = (e) => {
    e.preventDefault();
    const { item, updateItem } = this.props.component.props
    let removeId = e.target.getAttribute('data-id')

    let array = [ ...item.objects ]
    array = array.filter(a => a !== removeId )
    
    updateItem({
      ...item,
      objects: array
    })
  }

  
  addToArray = (e) => {
    e.preventDefault();
    const { item, updateItem } = this.props.component.props
    let addId = e.target.getAttribute('data-id')

    let array = item.objects ? [ ...item.objects ] : []
    array.push(`${addId}`)
    
    updateItem({
      ...item,
      objects: array
    })
  }

  moveUp = (e) => {
    e.preventDefault();
    const { item, updateItem } = this.props.component.props
    let id = e.target.getAttribute('data-id')
    let index = Number.parseInt(e.target.getAttribute('data-index'))
    
    let array = [ ...item.objects ]

    if(index > 0) {
      let switchVal = array[index - 1]
      array[index-1] = id
      array[index] = switchVal
    }
    
    updateItem({
      ...item,
      objects: array
    })
    
  }

  moveDown = (e) => {
    e.preventDefault();
    const { item, updateItem } = this.props.component.props
    let id = e.target.getAttribute('data-id')
    let index = Number.parseInt(e.target.getAttribute('data-index'))
    
    let array = [ ...item.objects ]

    if(index < array.length-1) {
      let switchVal = array[index + 1]
      array[index+1] = id
      array[index] = switchVal
    }
    
    updateItem({
      ...item,
      objects: array
    })
    
  }

  field = () => {
    const { field, item } = this.props.component.props
    const { masterItemList } = this.context
    let list = masterItemList[item.object_type]

    if (item[field.settings.fieldName] && item[field.settings.fieldName].length > 0) {
      if (this.state.objects.length > 0) {
        return item[field.settings.fieldName].map((i, index) => <div key={index}>
          {this.state.objects.filter(j => (j.container_id || j.tool_id || j.object_item_id || j.substance_id) === Number.parseInt(i))[0].display_name}
          <a onClick={this.moveUp} data-id={i} data-index={index}>Move Up</a>
          <a onClick={this.moveDown} data-id={i} data-index={index}>Move Down</a>
          <a onClick={this.removeFromArray} data-id={i}  >Remove</a>
          <br />
        </div>)
      }
    } 
  }


  render() {
    const { item } = this.props.component.props

    return <div>
      {item.objects && item.objects.length > 0 ? this.field() : ""}

      <br />
      <h4>Object List:</h4>
      <div style={{ height: '400px', overflowY: 'scroll', background: 'rgba(255,255,255,.4)', textAlign: 'center' }}>
        {this.state.objects.sort((a, b) => a.display_name.localeCompare(b.display_name)).map((o) => 
        <div>
          { item.objects && item.objects.includes( `${(o.container_id || o.tool_id || o.object_item_id || o.substance_id)}` ) ? "" : 
          <div>
            {o.display_name}  
            <button onClick={this.addToArray} data-id={(o.container_id || o.tool_id || o.object_item_id || o.substance_id)} >Add</button> 
          </div>
          }
        </div> )}
      </div>
    </div>

  }

}

ArrayField.contextType = LabContext
export default ArrayField
