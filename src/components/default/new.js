import React from 'react';
import { withRouter } from 'react-router'

import { loadingSpinner, permissionError, missingError } from 'helpers/site'
import HandleForm from 'components/shared/forms/formHandler'

import { ResourceContext } from './components/resourceContext'

class New extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = this.context
    this.permission = this.context.checkPermission('new')
    this.state = {
      item: this.context.getDefaultItem(),
      loading: true
    }
  }

  
  updateItem = (item) => {
    this.setState({item: item})
  }

  render() {
    const item = this.state.item

    //Very first, check the permissions.
    if (this.permission) {
      //Then, see if we have a custom index display.
      let customDisplay = this.settings.checkCustomDisplay('new')
      if (customDisplay) {
        //If so, go ahead and do the custom display.
        return customDisplay(item)
      } else {
        //If not, do the default view.
        return <div className="tpBlackBg color-box">
          <h1>{this.settings.get("newTitle")}</h1>
          <p>{this.settings.get("newText")}</p>
          <HandleForm
            item={item} 
            existing={false}
            updateItem={this.updateItem} loadPage={() => {}} />
        </div>
      }
    } else {
      //Error display
      return permissionError
    }


  }
}

New.contextType = ResourceContext
export default withRouter(New)

