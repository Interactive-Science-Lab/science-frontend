import React from 'react'
import { Form } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import { ResourceContext } from 'main/defaultComponent/componentParts/resourceContext'

import FormFields from './formFieldList'

/* FORM BUILDER */

/* 

Handles the overall UI of the form- the tags, the color, display, and errors 
-everything besides the fields themselves

FORM CSS ID:
${this.settings.names.us}-${this.settings.getId(item)}

*/


class FormBuilder extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {
            formColor: 'transparent',
            error: false
        }
    }

    /* SUBMIT FORM - 

    This is called directly from the button- 
    First it validates the information provided,
    Then making the API call passed down through props.
    
    That gives us the returned result, "res", and the path to redirect to

    If there's a success, we color the field, clear the error, and redirect.

    Otherwise, we display the error.
    
    */
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
            console.log(redirectPath)

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

    render() {
        return <Form
            style={{ backgroundColor: this.state.formColor }}
            onSubmit={this.submitForm}
            id={`${this.settings.names.us}-${this.settings.getId(this.props.item)}`} >

            {this.state.error ?
                <div style={{ backgroundColor: 'rgba(200,0,0,.4)', padding: '10px' }}>{this.state.error}</div>
                : ""}

            <FormFields {...this.props} />

            {this.submitButton()}

            {this.deleteButton()}

        </Form>
    }


    //LAYOUT HELPERS
    submitButton = () => {
        let text = ''
        if(this.props.action === 'edit') {
            text = this.settings.text.editSubmit
        } else {
            text = this.settings.text.newSubmit
        }
        return <button type='submit'>{text}</button>
    }

    deleteButton = () => {
        if( this.props.action === 'edit' && this.settings.checkPermission('delete', this.props.item) ) {
            return <button onClick={this.props.formCallbacks.deleteItem}>{this.settings.text.deleteLink}</button>
        }
    }


    //PRIVATE HELPER FUNCTIONS
    //Used to set the status of the form- display confirmations & errors
    //Takes in 'loading', 'success', 'error', or 'complete'
    formStatus = (status) => {
        this.colorForm(({ loading: 'white', success: 'green', error: 'red', complete: 'transparent' })[status])
    }
    
    colorForm = (color) => {
        this.setState({ formColor: color })
    }

    validate = () => {
        return this.settings.validateInput(this.props.item)
    }

}

FormBuilder.contextType = ResourceContext
export default withRouter(FormBuilder)

















