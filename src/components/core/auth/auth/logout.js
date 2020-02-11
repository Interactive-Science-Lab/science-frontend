import React from 'react'
import {Link} from 'react-router-dom'


import { UserContext } from 'helpers/userContext'


class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        this.context.logout();
    }

    render() {
        return <div className='tpBlackBg'>
            <h2>You are logged out.</h2>
            <p><Link to="/">Return Home</Link></p>
        </div>
    }
}

Logout.contextType = UserContext
export default Logout
