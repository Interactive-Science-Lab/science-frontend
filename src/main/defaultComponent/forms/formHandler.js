import React from 'react'
import BuildForm from './formBuilder'
import { withRouter } from "react-router-dom";

import { ResourceContext } from 'main/defaultComponent/components/resourceContext'

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
      apiCall = await this.settings.beEditCall(this.props.item)
    } else {
      apiCall = await this.settings.beNewCall(this.props.item)
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
        return this.settings.feViewPath(res.data)
      } else {
        return this.settings.feEditPath(res.data)
      }
    }

  }

  deleteItem = (e) => {
    e.preventDefault()
    if (window.confirm("Are you sure you wish to completely delete the item?")) {
      this.settings.beDeleteCall(this.props.item)
        .then(res => this.props.history.push(`${this.settings.get('urlPath')}`) )
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