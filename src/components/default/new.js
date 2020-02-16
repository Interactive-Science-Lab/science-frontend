import React from 'react';
import { withRouter } from 'react-router'

import { loadingSpinner, permissionError, missingError } from 'helpers/site'
import HandleForm from 'components/shared/forms/formHandler'

import settingHelper from 'db/settingHelpers'
import { ResourceContext } from './components/resourceContext'

class New extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = this.context
    this.permission = settingHelper.checkResourcePermission('new', this.settings)
    this.state = {
      item: {},
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
      let customDisplay = settingHelper.customResourceDisplay('new', this.settings)
      if (customDisplay) {
        //If so, go ahead and do the custom display.
        return customDisplay(item)
      } else {
        //If not, do the default view.
        return <div className="tpBlackBg color-box">
          <h1>{this.settings.name.new_title}</h1>
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

