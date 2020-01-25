import React from 'react'
import axios from 'axios'
import BuildForm from './buildForm'
import { withRouter } from "react-router-dom";
import api from '../../../helpers/api'
import {curr_user, headers, Protect} from '../../../helpers/api'


/* 
Possible props list- 
props.public- defaults to false, whether or not you need to be logged in to see the form (false is protected, true is public)
props.existing- defaults to whether or not there is an :id param. Override whether or not it's a "new" or "edit" form
props.editId- defaults to the :id param. Override to edit a different record.

props.formClass- the string to use for all locations/etc.
props.formClassUrl- a url string to use for post/put/deleting

props.apiRoute- completely override the end send url.

props.redirectField- gives the correct field to look on the object for the id (blog_id, author_id, etc.)
props.redirect- override the redirect destination after send.
props.blockRedirect- does not redirect after submission.
*/


class FormHandler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {},
      formClass: "",
      existing: (props.existing === true || props.existing === false) ? props.existing : (props.match.params.id ? true : false),
      editId: props.editId || props.match.params.id
    }
  }

  
  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

  updateInfo = (props = this.props) => {
    this.setState({item: props.item, formClass: props.formClass})
  }
  
  //UPDATE ITEM is a wrapper function passed as a callback to update this state
  updateItem = (item) => { this.setState({item}) }

    //A helper function that sets up & actually makes the api call with headers, etc.
    updateAPI = async (method, url, payload, bulkAdd) => {
      const headers = { headers: {'authorization': localStorage.token} }
      var apiCall;
  
      if(method === 'put') {
        await axios.put(url, payload, headers)
        .then((res) => apiCall = res)
        .catch((err) => apiCall = err.response)
      } else {
        await axios.post(url, payload, headers)
        .then((res) => apiCall = res)
        .catch((err) => apiCall = err.response)
      }
      //If the api call returns an error, DO NOT update the page, that clears the user input.
      if( !(apiCall.status === 400 || apiCall.status === 500) ){
        //If the api call is successful, we update the page we're on. 
        if(this.props.blockRedirect) { await this.props.update(apiCall) }
        else if(!bulkAdd) { await this.props.update() }
      }
      return apiCall

    }
  

  submitForm = async (bulkAdd = false) => {
    let item = this.state.item
    
    const postURL = api.apiPath(this.props.settings.name.urlPath || `/${this.state.formClass}`)
    const putURL = `${postURL}/${this.state.editId}`

    var apiCall, redirect;

    if(this.props.apiRoute){
      var overwritePath = api.apiPath(this.props.apiRoute)
    }


    if(this.state.existing) {
      apiCall = await this.updateAPI('put', overwritePath || putURL, item, bulkAdd)
      redirect = null
    } else {
      apiCall = await this.updateAPI('post', overwritePath || postURL, item, bulkAdd)
      
      redirect = this.redirectEditPath(apiCall)
    }

    return {apiCall, redirect}
  }

  deleteItem = (e) => {
    e.preventDefault()
    if(window.confirm("Are you sure you wish to completely delete the item?")){
      axios
          .delete(api.apiPath(`/${this.state.formClass}/${this.props.match.params.id}`), headers)
          .then(res =>
            this.props.history.push(`/${this.state.formClass}`)
          )
          .catch(err => console.log(err) )
    }
  }


  render() {
    const show = curr_user || this.props.public
    return show ?
      <div className='full-form'>
        <BuildForm 
          {...this.props}
          item={this.state.item} 
          updateItem={this.updateItem} 
          submitForm={this.submitForm} 
          deleteItem={this.deleteItem}
          existing={this.state.existing} 
          settings={this.props.settings}
          formClass={this.state.formClass} /> 
      </div>
    : ""
  }

  redirectEditPath = (res) => {
    if(this.props.blockRedirect) {
      return false
    }if(this.props.redirect) {
      return this.props.redirect
    } else {
      let redirectId = res.data[this.props.redirectIdField]
      return `/${this.state.formClass}/${redirectId}/edit`
    }

  }


}

export default withRouter(FormHandler)
