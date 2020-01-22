import React from 'react'
import axios from 'axios'
import HandleForm from './miniHandler'
import MainHandler from './handler'
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
    return <div>
      <h3>{ rConfig.title }</h3>
      <div>
        <DisplayExisting rConfig={rConfig} formClass={this.props.formClass} update={this.props.update} />
      </div>

      {
        this.props.formClass === 'thumbnail' && rConfig.records ? ""
        : <div>
          {rConfig.default_item ? <div>
            <HandleForm item={ rConfig.default_item } formClass={this.props.formClass} existing={false} info={rConfig} update={this.props.update} />
          </div>
          :""}
        </div>
      }

    </div>
  }


}

export default withRouter(RelationshipForm)
