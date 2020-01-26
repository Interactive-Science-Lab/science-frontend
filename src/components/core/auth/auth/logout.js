import React from 'react'
import {Link} from 'react-router-dom'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        this.props.auth.logout();
    }

    render() {
        return <div className='tpBlackBg'>
            <h2>You are logged out.</h2>
            <p><Link to="/">Return Home</Link></p>
        </div>
    }
}

export default Logout
