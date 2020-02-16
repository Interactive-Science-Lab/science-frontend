import React from 'react'
import axios from 'axios'
import HandleForm from './miniHandler'
import MainHandler from './formHandler'
import { withRouter } from "react-router-dom";

import relationshipConfig from './relationships/relationshipConfig'
import DisplayExisting from './relationships/displayExisting'


class RelationshipForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const rConfig = relationshipConfig(this.props)
    return rConfig ? <div>
      <h3>{ rConfig.title }</h3>
      <div>
        <DisplayExisting rConfig={rConfig} formClass={this.props.formClass} update={this.props.update} />
      </div>

      <div>
          {rConfig.default_item ? <div>
            <HandleForm item={ rConfig.resourceSettings.fields } formClass={this.props.formClass} existing={false} info={rConfig} update={this.props.update} />
          </div>
          :""}
      </div>
      

    </div> : ""
  }


}

export default withRouter(RelationshipForm)
