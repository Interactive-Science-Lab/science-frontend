import React from 'react'
import { withRouter } from "react-router-dom";
import InsertForm from '../component/form'

import { ResourceContext } from 'portal/asteroid/contexts/resourceContext'

/* This component controls the state for object forms that may be placed other places */
class subFormController extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      item: props.item,
      showForm: false
    }
  }

  //UPDATE INFO just resets state with new props
  componentDidMount = () => { this.updateInfo(); }
  UNSAFE_componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}
  updateInfo = (props = this.props) => { this.setState({item: props.item}) }

  //UPDATE ITEM is a wrapper function passed as a callback to update this state
  updateItem = (item) => { this.setState({item}) }


  toggleFormShow = (e) => {
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    return <div className="mini-form-handler">
      <h5 onClick={this.toggleFormShow}>
        {this.props.action === 'edit' ? "EDIT" : "ADD NEW"} 
        {this.state.showForm ? "-" : "+" }
      </h5>
  

      {this.state.showForm ?
      <div className='mini-form'>
        <InsertForm {...this.props} blockRedirect={true} item={this.state.item} updateItem={this.updateItem} loadPage={this.props.loadPage} /> 
      </div>
    : (this.props.action === 'edit' ? "HEY DISPLAY A THING HERE" : "")
    }
    </div>
  }

}

subFormController.contextType = ResourceContext
export default withRouter(subFormController)





// formData = (id) => {
//     const formId = `${this.state.formClass}-${id}`
//     let myForm = document.getElementById(formId);
//     return new FormData(myForm);
//   }
