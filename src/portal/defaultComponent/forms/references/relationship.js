import React from 'react'
import { withRouter } from "react-router-dom";

import SubForm from './subFormController'

import { ResourceContext } from 'portal/asteroid/contexts/resourceContext'

class RelationshipForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = this.context
    this.state = {}
  }

  render() {
    let {referenceField, item} = this.props
    return <div>
      <h3>{ referenceField.info.title }</h3>
      <div>
        <SubForm action={'edit'} {...this.props} item={ item[ referenceField.targetField ] } />
      </div>

      <div>
        <SubForm action={'new'} {...this.props} item={ this.settings.getDefaultItem() }/>
      </div>
      

    </div>
  }


}

RelationshipForm.contextType = ResourceContext
export default withRouter(RelationshipForm)
