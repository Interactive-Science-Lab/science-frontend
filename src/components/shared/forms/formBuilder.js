import React from 'react'
import { Form } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import { ResourceContext } from 'components/default/components/resourceContext'
import settingHelper from 'db/settingHelpers'

import FormFields from './formFields'

//Handles the overall UI of the form besides the fields themselves- the color, display, and errors.
class FormHandler extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {
            formColor: 'transparent',
            error: false
        }
    }

    //Used to set the status of the form- display confirmations & errors
    formStatus = (status) => {
        this.colorForm(({ loading: 'white', success: 'green', error: 'red', complete: 'transparent' })[status])
    }

    validate = () => {
        return settingHelper.validateInput(this.settings, this.props.item)
    }

    submitForm = async (e) => {
        e.preventDefault();

        //Validate
        if (this.validate()) {
            //change the color
            this.formStatus('loading');

            //Make the actual call
            const results = await this.props.formCallbacks.submitForm();
            const res = results.apiCall
            const redirectPath = results.redirect

            //This indicates the call was a success.
            if (res.status === 201 || res.status === 200) {
                //Set the color back, and clear the error.
                this.formStatus('success');
                this.setState({ "error": "" })
                if (redirectPath) { this.props.history.push(redirectPath) }
            } else {
                //Show an error
                this.formStatus('error');
                //If there's a message to display, do so.
                if (res.response && (res.response.status === 400)) {
                    this.setState({ error: res.response.data.message })
                } else { this.setState({ error: "Unknown error." }) }
            }
        } else {
            this.formStatus('error');
            this.setState({ error: "Please check the information you input." });
        }

        //Wait a quarter second and clear the result.
        setTimeout(() => { this.formStatus('complete') }, 250);
    }

    checkView = () => { return true }

    render() {
        return <Form
            style={{ backgroundColor: this.state.formColor }}
            onSubmit={this.submitForm}
            id={`${this.props.formClass}-${this.props.item.id}`} >

            {this.state.error ?
                <div style={{ backgroundColor: 'rgba(200,0,0,.4)', padding: '10px' }}>{this.state.error}</div>
                : ""}

            <FormFields {...this.props} />

            <button type='submit'>{this.props.existing ?
                (this.props.editButtonText ? this.props.editButtonText : `Edit`) : "Add"}

            </button>
            {this.props.existing && !this.props.hideDeleteButton ?
                <button onClick={this.props.formCallbacks.deleteItem}>Delete</button> : ""}

        </Form>
    }


    //UTITLITY FUNCTIONS
    colorForm = (color) => {
        this.setState({ formColor: color })
    }
}

FormHandler.contextType = ResourceContext
export default withRouter(FormHandler)

















