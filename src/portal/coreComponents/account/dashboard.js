import React from 'react'
import {Link} from 'react-router-dom'
import { curr_user } from 'helpers/api'
import { UserContext } from 'portal/asteroid/contexts/userContext'



/* This is the component for when a user typically first logs in; the dashboard, "home login" page */

class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
        }
    }

    render() {

        return <div>
            <h1>User Dashboard/Portal</h1>

            <h2>Your Account</h2>
            {curr_user.username} ({curr_user.user_email})<br />
            {curr_user.user_kind} {curr_user.user_role}<br />
            <Link to={`/auth/user/${curr_user.user_id}`}>View Profile</Link>
            <Link to={`/auth/user/${curr_user.user_id}/edit`}>Edit Accpunt</Link>
            

            
            <h2>Admin Settings</h2>
            {this.context.site.components.map((resource) =>
            
                resource.checkPermission('index') ? 
                <div> 
                    { resource.names.friendly }
                    <Link to={`/resources/${resource.resource_id}`}>Edit Resource Settings</Link>
                    <Link to={resource.names.urlPath}>Edit/Add Instances</Link>
                </div> : "" 
            )}

            <br />

        </div>

    }
}

Dashboard.contextType = UserContext
export default Dashboard
