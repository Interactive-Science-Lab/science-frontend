import React from 'react'
import { Form } from 'react-bootstrap'
import { Input } from 'reactstrap'
import { withRouter } from "react-router-dom";

import formHelpers from './form_helpers'

import BasicTextField from './fieldTypes/basicText'
import TextAreaField from './fieldTypes/textArea'
import BasicNumberField from './fieldTypes/basicNumber'
import BasicBooleanField from './fieldTypes/basicBoolean'

import ArrayField from './fieldTypes/array'
import IdSelectField from './fieldTypes/idSelect'

import ImageField from './fieldTypes/imageFile'

import VerifyPhone from './fieldTypes/verifyPhone'


const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class FormHandler extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formColor: 'transparent',
            duplicateConnection: false,
            bulkAdd: false,
            error: false

        }
    }

    //Used to set the status of the form- display confirmations & errors
    formStatus = (status) => {
        switch (status) {
            case "loading":
                this.colorForm("white")
                break;

            case "success":
                this.colorForm("green")
                break;

            case "error":
                this.colorForm("red")
                break;

            case "complete":
                this.colorForm("transparent")
                break;

            default:
                break;
        }
    }

    submitForm = async (e) => {
        e.preventDefault();
        this.formStatus('loading');
        const results = await this.props.submitForm(this.state.bulkAdd);
        const res = results.apiCall
        const redirectPath = results.redirect

        console.log(res)

        if (res.status === 200 || res.status === 201) {
            this.formStatus('success');
            this.setState({"error":""})
            if (redirectPath && !this.state.bulkAdd) { this.props.history.push(redirectPath) }
        } else {
            this.formStatus('error');
            if (res.response && (res.response.status === 400)) {
                this.setState({ error: res.response.data.message })
            } else { this.setState({ error: "Unknown error." }) }
        }

        setTimeout(() => { this.formStatus('complete') }, 250);
    }


    render() {

        return <Form
            style={{ backgroundColor: this.state.formColor }}
            onSubmit={this.submitForm}
            id={`${this.props.formClass}-${this.props.item.id}`} >

            {this.state.error ?
                <div style={{ backgroundColor: 'rgba(200,0,0,.4)', padding: '10px' }}>{this.state.error}</div>
                : ""}

            {Object.entries(this.props.item).map(itemField => <div key={itemField[0]}>

                {
                    //Basic text fields that don't wrap
                    formHelpers.checkBasicText(itemField) ?
                        <BasicTextField field={itemField} callback={this.handleChange} item={this.props.item} /> : ""
                }

                {
                    //Text areas with large boxes to write articles
                    formHelpers.checkTextField(itemField) ?
                        <TextAreaField field={itemField} callback={this.handleChange} item={this.props.item} /> : ""
                }

                {
                    //The forms that create a select field
                    formHelpers.checkIdSelectField(itemField) ?
                        <IdSelectField item={this.props.item} field={itemField[0]} value={itemField[1]} handleChange={this.handleChangeCb} /> : ""
                }

                {
                    //Special array handling UI
                    formHelpers.checkArrayOptionsField(itemField) ?
                        <ArrayField item={this.props.item} field={itemField[0]} array={itemField[1]} handleArrayChange={this.handleArrayChange} /> : ""
                }

                {
                    //For numbers
                    formHelpers.checkBasicNumber(itemField) ?
                        <BasicNumberField field={itemField} callback={this.handleChange} item={this.props.item} /> : ""
                }

                {
                    //Booleans create a checkbox
                    typeof itemField[1] === 'boolean' && itemField[0] != 'duplicateConnection' ?
                        <BasicBooleanField field={itemField} callback={this.handleCheck} item={this.props.item} /> : ""
                }

                {
                    //Displays the fields for an image
                    itemField[0] === 'image_url' ?
                        <ImageField field={itemField} callback={this.handleFileChange} item={this.props.item} /> : ""
                }


                {
                    //Verification for a phone number
                    itemField[0] === 'phone' ?
                        <VerifyPhone field={itemField} callback={this.handleChange} item={this.props.item} /> : ""
                }

                {
                    itemField[0] === 'blog_status' || itemField[0] === 'page_status' ? 
                    <div>
                        View Status<br />
                        <select  onChange={this.handleChange} name={itemField[0]} value={itemField[1]}>
                            <option value="draft">Draft</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div> : ""
                }
                
                {
                    itemField[0] === 'blog_category' ? 
                    <div>
                        Blog Category<br />
                        <select onChange={this.handleChange} name={itemField[0]} value={itemField[1]}>
                            <option value="News">News</option>
                            <option value="Blog">Blog</option>
                            <option value="Project">Project</option>
                        </select>
                    </div> : ""
                }

{
                    itemField[0] === 'page_category' ? 
                    <div>
                        Page Category<br />
                        <select onChange={this.handleChange} name={itemField[0]} value={itemField[1]}>
                            <option value="News">About</option>
                            <option value="Blog">Features</option>
                        </select>
                    </div> : ""
                }

                { /* ADD hidden fields here */}
                {itemField[0] === 'foreign_id' ? <Input type="hidden" name="foreign_id" value={this.props.item.foreign_id} /> : ""}
                {itemField[0] === 'foreign_key' ? <Input type="hidden" name="foreign_key" value={this.props.item.foreign_key} /> : ""}
                {itemField[0] === 'foreign_class' ? <Input type="hidden" name="foreign_class" value={this.props.item.foreign_class} /> : ""}

            </div>)}


            <button type='submit'>{this.props.existing ? 
            (this.props.editButtonText ? this.props.editButtonText : `Edit`) : "Add"}

            </button>
            { this.props.existing && !this.props.hideDeleteButton ? 
            <button onClick={this.props.deleteItem}>Delete</button> : "" }

        </Form>
    }


    //UTITLITY FUNCTIONS

    colorForm = (color) => {
        this.setState({ formColor: color })
    }

    //ALL THE CHANGE FUNCTIONS

    handleChange = (e) => {
        this.props.updateItem({
            ...this.props.item,
            [e.target.name]: e.target.value
        })
    }

    handleCheck = (e) => {
        this.props.updateItem({
            ...this.props.item,
            [e.target.name]: e.target.checked
        })
    }

    handleChangeCb = (field, value) => {
        this.props.updateItem({
            ...this.props.item,
            [field]: value
        })
    }

    handleArrayChange = (field, array) => {
        this.props.updateItem({
            ...this.props.item,
            [field]: array
        })
    }

    handleDateArrayChange = (field, array) => {
        array = array.map(a => a ? new Date(a).toUTCString() : null )
        this.props.updateItem({
            ...this.props.item,
            [field]: array
        })
    }

    handleFileChange = (e) => {
        if (e.target.files[0]) {
            this.props.updateItem({
                ...this.props.item,
                image_raw: e.target.files[0],
                image_preview_url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    handleSelectIntChange = (e) => {
        this.props.updateItem({
            ...this.props.item,
            [e.target.name]: Number.parseInt(e.target.value)
        })
    }

    toggleBulkAdd = (e) => {
        this.setState({ bulkAdd: !this.state.bulkAdd })
    }


}

export default withRouter(FormHandler)

















