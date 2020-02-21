import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router'
import api from 'helpers/api'

import { loadingSpinner, permissionError, missingError } from 'helpers/site'

import settingHelper from 'db/settingHelpers'
import { ResourceContext } from './components/resourceContext'

import DefaultEdit from './components/defaultEdit'

class Edit extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = this.context
    this.permission = settingHelper.checkResourcePermission('edit', this.settings)
    this.state = {
      item: {},
      loading: true
    }
  }

  componentDidMount = () => { this.loadPage(); }
  componentDidUpdate = (pProps, pState) => {
    //This make sures there a reason to call the api before doing so.
    if (this.props.match.params.id !== pProps.match.params.id) { this.loadPage() }
  }

  updateItem = (item) => {
    this.setState({item: item})
  }

  loadPage = async () => {
    if (this.permission) {
      await this.setState({ loading: true })
      const id = this.props.match.params.id
      axios
        .get(api.apiPath(`${this.settings.name.urlPath}/${id}`))
        .then(res => this.setState({ item: res.data }))
        .catch(err => console.log(err));
      await this.setState({ loading: false })
    }
  }

  render() {
    const item = this.state.item

    //Very first, check the permissions.
    if (this.permission) {
      //Then we see if there is any result pulled back.
      if (Object.entries(item).length > 0) {
        //Then, see if we have a custom index display.
        let customDisplay = settingHelper.customResourceDisplay('edit', this.settings)
        if (customDisplay) {
          //If so, go ahead and do the custom display.
          return customDisplay(item)
        } else {
          //If not, do the default view.
          return <DefaultEdit item={item} updateItem={this.updateItem} loadPage={this.loadPage} />
        }
      } else {
        //Display the loading spinner.
        if (this.state.loading) { return loadingSpinner }
        //Another error page.
        else { return missingError }
      }
    } else {
      //Error display
      return this.settings.name.friendly === 'feedback' ? <h1>Thank you for your feedback!</h1> : permissionError
    }


  }
}

Edit.contextType = ResourceContext
export default withRouter(Edit)
