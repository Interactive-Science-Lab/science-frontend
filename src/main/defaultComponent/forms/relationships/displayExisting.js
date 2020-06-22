import React from 'react'
import SubForm from './subFormController'
import { ResourceContext } from 'main/defaultComponent/componentParts/resourceContext'

class Existing extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = context
    this.state = {

    }
  }

  render() {
    let {referenceField, item} = this.props
    let formItem = this.settings.getItemFields( item[ referenceField.targetField ] ) 
    
    return <SubForm action={'edit'} {...this.props} item={formItem} />

    
  }




}

Existing.contextType = ResourceContext
export default Existing
