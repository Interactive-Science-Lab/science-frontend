import React from 'react'
import BuildForm from './formStructure'
import { withRouter } from "react-router-dom";

import { ResourceContext } from 'main/defaultComponent/componentParts/resourceContext'

/* 

This is the boss form class.

It takes in an item, a settings context, 
An action ('edit' or 'new')
and an UpdateItem callback and a LoadPage callback

In general, it handles calling the actual BackEnd calls,
and handling the redirect.

This page defines "SUBMIT FORM" and "DELETE ITEM"
to pass down through 

total functions being passed down-
updateItem()
loadPage()
submitForm()
deleteItem()

*/

class FormHandler extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = this.context

  }

  /* SUBMIT FORM- CALLBACK */
  //Organizes & sets up the api call & redirect
  submitForm = async () => {
    //Helper (defined below) that goes through the settings and actually makes the call
    const apiCall = await this.callAPI()
    //Takes the result and figures out where to redirect
    const redirect = this.redirectUrl(apiCall)

    //returns the result of the call and the redirectUrl
    return { apiCall, redirect }
  }

  /* DELETE ITEM- CALLBACK */
  /* This gets passed down through props so it can be called & placed in the according location. */
  deleteItem = (e) => {
    e.preventDefault()
    //See if we're supposed to confirm the delete with a pop up, and do so or not.
    if (this.settings.options.confirmDelete) {
      if (window.confirm(this.settings.text.deleteWarning)) {
        this.deleteCall()
      }
    } else {
      this.deleteCall()
    }
  }

  render() {
    //We add on a submitForm call back, and a deleteItem call back.
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

  /* PRIVATE HELPERS */
  //This function does the axios call and handles the redirect/passes on the error.
  callAPI = async () => {
    let apiCall = null;
    //These are actual axois calls as defined in the component class.
    if (this.props.action === 'edit') {
      apiCall = await this.settings.beEditCall(this.props.item)
    } else {
      apiCall = await this.settings.beNewCall(this.props.item)
    }

    //If the api call returns an error, DO NOT update the page, that clears the user input.
    if (!(apiCall.status === 400 || apiCall.status === 500)) {
      //If the api call is successful, we update the page we're on. 
      if (this.settings.options.blockRedirect) { await this.props.updateItem(apiCall) }
      else { await this.props.loadPage() }
    }
    return apiCall

  }

  //Logic to see where to redirect to.
  redirectUrl = (res) => {
    //Option to block a redirect and just stay on the form.
    if (this.settings.options.blockFormRedirect || this.props.blockRedirect ) {
      return false
    }
    //Option to plug in a custom redirect field in props. 
    if (this.settings.options.formRedirectPath) {
      return this.settings.options.formRedirectPath
    } else {
      //Direct to the appropriate page.
      if (this.props.action === 'edit') {
        return this.settings.options.editRedirect(res.data)
      } else {
        return this.settings.options.newRedirect(res.data)
      }
    }
  }

  //Just a helper to actually do the call.
  deleteCall = () => {
    this.settings.beDeleteCall(this.props.item)
      .then(res => this.props.history.push(`${this.settings.options.deleteRedirect}`))
      .catch(err => console.log(err))
  }

}


FormHandler.contextType = ResourceContext
export default withRouter(FormHandler)