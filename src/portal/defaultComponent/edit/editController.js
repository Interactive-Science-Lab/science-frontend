import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router'
import api from 'helpers/api'

import { loadingSpinner, permissionError, missingError } from 'site/siteSettings'

import { ResourceContext } from '../../asteroid/contexts/resourceContext'

import DefaultEdit from './editLayout'

class Edit extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = this.context
    this.state = {
      item: {},
      loading: true,
      permission: true
    }
  }

  componentDidMount = () => { this.loadPage(); }
  componentDidUpdate = (pProps, pState) => {
    //This make sures there a reason to call the api before doing so.
    if (this.props.match.params.id !== pProps.match.params.id) { this.loadPage() }
  }

  //A callback to directly update the item in state.
  updateItem = (item) => {
    this.setState({ item: item })
  }

  
  loadPage = async () => {
    if (this.state.permission) {
      await this.setState({ loading: true })
      const id = this.props.match.params.id
      axios
        .get(api.apiPath(`${this.settings.get('urlPath')}/${id}`))
        .then(res => this.setState({ item: res.data, permission: this.settings.checkPermission('edit', res.data) }))
        .catch(err => console.log(err));
      await this.setState({ loading: false })
    }
  }

  render() {
    const { item } = this.state
    const settings = this.settings

    //Very first, check the permissions.
    if (this.state.permission) {
      //Then we see if there is any result pulled back.
      if (Object.entries(item).length > 0) {
        //Then, see if we have a custom index display.
        let customDisplay = settings.checkCustomDisplay('edit')
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
      let submit_message = this.settings.options.submit_message
      if (submit_message) {
        return submit_message(item)
      } else {
        return permissionError
      }
    }


  }
}

Edit.contextType = ResourceContext
export default withRouter(Edit)
