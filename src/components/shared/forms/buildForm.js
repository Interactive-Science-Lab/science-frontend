import React from 'react'
import { Form } from 'react-bootstrap'
import { Input } from 'reactstrap'
import { withRouter } from "react-router-dom";

import formHelpers from './form_helpers'
import listReactFiles from 'list-react-files'

import { resourceFullFields } from 'db/defaultObjects'

import BasicTextField from './fieldTypes/basicText'
import TextAreaField from './fieldTypes/textArea'
import BasicNumberField from './fieldTypes/basicNumber'
import BasicBooleanField from './fieldTypes/basicBoolean'
import ObjectField from './fieldTypes/objectField'

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

        if (res.status === 200 || res.status === 201) {
            this.formStatus('success');
            this.setState({ "error": "" })
            if (redirectPath && !this.state.bulkAdd) { this.props.history.push(redirectPath) }
        } else {
            this.formStatus('error');
            if (res.response && (res.response.status === 400)) {
                this.setState({ error: res.response.data.message })
            } else { this.setState({ error: "Unknown error." }) }
        }

        setTimeout(() => { this.formStatus('complete') }, 250);
    }

    checkView = (settings) => {
        let ret = true

        if (settings[1].permissions) {
            const p = settings[1].permissions
            if (this.props.existing) {
                ret = ret && p.indexOf('static') < 0
            } else {
                ret = ret && p.indexOf('auto') < 0
            }

            p.map(perm => {
                if (['mod', 'user', 'admin', 'edit-mod', 'edit-admin'].indexOf(perm) >= 0) {
                    ret = ret && curr_user ? true : false
                }
            })

            ret = ret && p.indexOf('background') < 0

        }

        return ret
    }


    render() {
        return <Form
            style={{ backgroundColor: this.state.formColor }}
            onSubmit={this.submitForm}
            id={`${this.props.formClass}-${this.props.item.id}`} >

            {this.state.error ?
                <div style={{ backgroundColor: 'rgba(200,0,0,.4)', padding: '10px' }}>{this.state.error}</div>
                : ""}

            {
                this.props.settings ? resourceFullFields(this.props.settings.name.urlPath.substring(1), this.props.item).map(field => <div>
                    {this.checkView(field.settings) ? <div>
                        {
                            field.settings[1].fieldType === 'string' ?
                                <BasicTextField field={[field.name, field.value]} callback={this.handleChange} item={this.props.item} /> : ""
                        }

                        {
                            field.settings[1].fieldType === 'object' ?
                                <ObjectField field={[field.name, field.value]} callback={this.handleObjectChange} item={this.props.item} /> : ""
                        }



                        {
                            //Text areas with large boxes to write articles
                            field.settings[1].fieldType === 'text' ?
                                <TextAreaField field={[field.name, field.value]} callback={this.handleChange} item={this.props.item} /> : ""
                        }
                        {
                            //Text areas with large boxes to write articles
                            field.settings[1].fieldType === 'html' ?
                                <TextAreaField field={[field.name, field.value]} callback={this.handleChange} item={this.props.item} /> : ""
                        }

                        {
                            //The forms that create a select field
                            formHelpers.checkIdSelectField([field.name, field.value]) ?
                                <IdSelectField item={this.props.item} field={[field.name, field.value][0]} value={[field.name, field.value][1]} handleChange={this.handleChangeCb} /> : ""
                        }
                        {
                            field.settings[1].fieldType === 'icon' ?
                                <BasicTextField settings={field.settings} field={[field.name, field.value]} callback={this.handleChange} item={this.props.item} /> : ""
                        }

                        {
                            field.settings[1].fieldType === 'local-image' ?<div>
                                <BasicTextField settings={field.settings} field={[field.name, field.value]} callback={this.handleChange} item={this.props.item} /> 
                                
                                </div>: ""
                        }


                        {
                            //Special array handling UI
                            field.settings[1].fieldType === 'array' ?
                                <ArrayField item={this.props.item} field={[field.name, field.value][0]} array={[field.name, field.value][1]} handleArrayChange={this.handleArrayChange} /> : ""
                        }

                        {
                            //For numbers
                            field.settings[1].fieldType === 'number' ?
                                <BasicNumberField field={[field.name, field.value]} callback={this.handleChange} item={this.props.item} /> : ""
                        }

                        {
                            //Booleans create a checkbox
                            field.settings[1].fieldType === 'boolean' ?
                                <BasicBooleanField field={[field.name, field.value]} callback={this.handleCheck} item={this.props.item} /> : ""
                        }

                        {
                            //Displays the fields for an image
                            [field.name, field.value][0] === 'image_url' ?
                                <ImageField field={[field.name, field.value]} callback={this.handleFileChange} item={this.props.item} /> : ""
                        }


                        {
                            //Verification for a phone number
                            [field.name, field.value][0] === 'phone' ?
                                <VerifyPhone field={[field.name, field.value]} callback={this.handleChange} item={this.props.item} /> : ""
                        }

                        {
                            field.settings[1].fieldType && field.settings[1].fieldType[0] === 'select-draft' ?
                                <div>
                                    View Status<br />
                                    <select onChange={this.handleChange} name={[field.name, field.value][0]} value={[field.name, field.value][1]}>
                                        <option value="draft">Draft</option>
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </select>
                                </div> : ""
                        }

                        {
                            field.settings[1].fieldType && field.settings[1].fieldType[0] === 'select-open' ?
                                <div>
                                    View Status<br />
                                    <select onChange={this.handleChange} name={[field.name, field.value][0]} value={[field.name, field.value][1]}>
                                        <option value="draft">Pending</option>
                                        <option value="public">Open</option>
                                        <option value="private">Closed</option>
                                        <option value="private">Solved</option>
                                        <option value="private">Re-Opened</option>
                                    </select>
                                </div> : ""
                        }

                        {
                            field.settings[1].fieldType && field.settings[1].fieldType[0] === 'select-custom' ?
                                <div>
                                    {field.name}<br />
                                    <select onChange={this.handleChange} name={[field.name, field.value][0]} value={[field.name, field.value][1]}>
                                        {field.settings[1].fieldType[1].map(option => <option value={option}>{option}</option>)}
                                    </select>
                                </div> : ""
                        }


                        {
                            field.settings[1].fieldType && field.settings[1].fieldType[0] === 'select-custom-int' ?
                                <div>
                                    {field.name}<br />
                                    <select onChange={this.handleSelectIntChange} name={[field.name, field.value][0]} value={[field.name, field.value][1]}>
                                        {field.settings[1].fieldType[1].map((option, i) => <option value={i}>{option}</option>)}
                                    </select>
                                </div> : ""
                        }

                        { /* ADD hidden fields here */}
                        {[field.name, field.value][0] === 'foreign_id' ? <Input type="hidden" name="foreign_id" value={this.props.item.foreign_id} /> : ""}
                        {[field.name, field.value][0] === 'foreign_key' ? <Input type="hidden" name="foreign_key" value={this.props.item.foreign_key} /> : ""}
                        {[field.name, field.value][0] === 'foreign_class' ? <Input type="hidden" name="foreign_class" value={this.props.item.foreign_class} /> : ""}


                        { /* Validations */}
                        {field.settings[1].validations ? field.settings[1].validations.map(val => <div>
                            {val === 'required' ? (!field.value || field.value === "" ? "Field is required." : "") : ""}
                        </div>) : ""}


                    </div> : ""}</div>) : ""}


            <button type='submit'>{this.props.existing ?
                (this.props.editButtonText ? this.props.editButtonText : `Edit`) : "Add"}

            </button>
            {this.props.existing && !this.props.hideDeleteButton ?
                <button onClick={this.props.deleteItem}>Delete</button> : ""}

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

    handleObjectChange = (e) => {
        let value = {}
        try { value = JSON.parse(e.target.value) } 
        catch { console.log("That is not valid JSON, failed parse.") }
        this.props.updateItem({
            ...this.props.item,
            [e.target.name]: value
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
        array = array.map(a => a ? new Date(a).toUTCString() : null)
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

















