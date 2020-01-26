import React from 'react'
import {Form} from 'react-bootstrap'
import axios from 'axios'
import api from '../../../../helpers/api'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            passwordConfirm: "", 
            error: false,
            confirm: false
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitForm = (e) => {
        e.preventDefault();
        if(this.state.password === this.state.passwordConfirm) {
            const {username, verify_hash} = this.props.match.params
            axios
                .put(api.resetPasswordPath(username, verify_hash), 
                {password:this.state.password})
                .then(res => this.setState({confirm: true} ))
                .catch(err => console.log(err) );
        } else {
            this.setState({error: "Please make sure your passwords match."})
        }
    }

    render() {
        return <div className='tpBlackBg'>
            <h2>Reset Your Password</h2>
            { this.state.confirm ? "Thank you. Please log in with your new password." : 
                <Form onSubmit={this.submitForm} style={{width:"800px", margin:"auto"}}>
                    
                    { this.state.error || "" }
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        onChange={this.handleChange} type="password"
                        name="password" placeholder="password"
                        value={this.state.password} />
                        <Form.Text>Please enter.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm</Form.Label>
                        <Form.Control
                        onChange={this.handleChange} type="password"
                        name="passwordConfirm" placeholder="Confirm"
                        value={this.state.passwordConfirm} />
                        <Form.Text>Please enter.</Form.Text>
                    </Form.Group>
                    <button type="submit">Submit</button>
                </Form>
            }
        </div>
    }
}

export default Profile
