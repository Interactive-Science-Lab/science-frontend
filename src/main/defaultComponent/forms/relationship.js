import React from 'react'
import HandleForm from './miniHandler'
import { withRouter } from "react-router-dom";

import DisplayExisting from './relationships/displayExisting'

import { ResourceContext } from 'main/defaultComponent/componentParts/resourceContext'



class RelationshipForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const rConfig = {} //relationshipConfig(this.props)
    return rConfig ? <div>
      <h3>{ rConfig.title }</h3>
      <div>
        <DisplayExisting rConfig={rConfig} formClass={this.props.formClass} update={this.props.update} />
      </div>

      <div>
          {rConfig.default_item ? <div>
            <HandleForm item={ this.context.getDefaultItem() } formClass={this.props.formClass} existing={false} info={rConfig} update={this.props.update} />
          </div>
          :""}
      </div>
      

    </div> : ""
  }


}

RelationshipForm.contextType = ResourceContext
export default withRouter(RelationshipForm)
