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

   componentDidMount = () => {
        const {username, verify_hash} = this.props.match.params
        axios
            .get(api.verifyUserPath(username, verify_hash))
                .then(res => {})
                .catch(err => {});
    }

    render() {
        return <div className='tpBlackBg'>
            <h2>Thank you for verifying</h2>
            <h4>Please login using your credentials.</h4>
        </div>
    }
}

export default Profile
