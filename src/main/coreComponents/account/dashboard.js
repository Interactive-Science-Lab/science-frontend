import React from 'react'
//import {Link} from 'react-router-dom'
import {curr_user} from 'helpers/api'

/* This is the component for when a user typically first logs in; the dashboard, "home login" page */

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return JSON.stringify(curr_user)
    }
}

export default Profile
