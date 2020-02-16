import React from 'react'
import BuildForm from './formBuilder'
import { withRouter } from "react-router-dom";

import settingHelper from 'db/settingHelpers'
import { ResourceContext } from 'components/default/components/resourceContext'

class FormHandler extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = this.context

  }

  //Organizes & sets up the api call & redirect
  submitForm = async () => {
    //Actually makes the call
    const apiCall = await this.callAPI()
    //Takes the result and figures out where to redirect
    const redirect = this.redirectUrl(apiCall)

    return { apiCall, redirect }
  }

  //This function does the axios call and handles the redirect/passes on the error.
  callAPI = async () => {
    let apiCall = null;
    if (this.props.existing) {
      apiCall = await settingHelper.beEditCall(this.settings, this.props.item)
    } else {
      apiCall = await settingHelper.beNewCall(this.settings, this.props.item)
    }

    //If the api call returns an error, DO NOT update the page, that clears the user input.
    if (!(apiCall.status === 400 || apiCall.status === 500)) {
      //If the api call is successful, we update the page we're on. 
      if (this.props.blockRedirect) { await this.props.update(apiCall) }
      else { await this.props.loadPage() }
    }
    return apiCall

  }

  //Logic to see where to redirect to.
  redirectUrl = (res) => {
    //Option to block a redirect and just stay on the form.
    if (this.props.blockRedirect) {
      return false
    }
    //Option to plug in a custom redirect field in props. 
    if (this.props.redirect) {
      return this.props.redirect
    } else {
      //If it's existing, redirect to the view page, if it's new, redirect to the edit page.
      if (this.props.existing) {
        return settingHelper.feViewPath(this.settings, res.data)
      } else {
        return settingHelper.feEditPath(this.settings, res.data)
      }
    }

  }

  deleteItem = (e) => {
    e.preventDefault()
    if (window.confirm("Are you sure you wish to completely delete the item?")) {
      settingHelper.beDeleteCall(this.settings, this.props.item)
        .then(res => this.props.history.push(`${this.settings.name.urlPath}`) )
        .catch(err => console.log(err))
    }
  }

  render() {
    const formCallbacks = {
      submitForm: this.submitForm,
      deleteItem: this.deleteItem
    }
    return <div className='full-form'>
      <BuildForm
        {...this.props}
        item={this.props.item}
        formCallbacks={formCallbacks}
      />
    </div>
  }




}


FormHandler.contextType = ResourceContext
export default withRouter(FormHandler)