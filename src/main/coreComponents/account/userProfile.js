import React from 'react'
import {Link} from 'react-router-dom'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const user = curr_user
        const info = user.userInfo

        let error = []

        const basicInfo = info.user_first_name === "" || 
        info.user_last_name === "" || 
        info.user_professional_title === "" ||
        info.user_display_name === "" || 
        (!info.user_first_name || !info.user_display_name || !info.user_display_name || !info.user_professional_title)

        if(basicInfo) {error.push("Please fill out the basic information below.")}

        if(!info.team_id) {error.push("Please either create a team or find yours to join.")}

        if(info.team_id && !info.team_verified) {error.push("Awaiting team verification.")}

        return <div className='tpBlackBg'>
            <h2>Welcome, {curr_user.username}</h2>

            {error.length > 0 ? <div style={{backgroundColor:"rgba(200,0,0,.5)"}}>{error.map(e => <p>>{e}</p>)} <i>If you have taken care of these and this message still shows, please try refreshing the page.</i></div> : ""}

            <p>{curr_user.userInfo.user_display_name}</p>
            <Link className='nice-button' to="/alerts">Your Alerts</Link><br />
            <Link className='nice-button' to="/messages">Your Messages</Link><br />
            <Link className='nice-button' to="/athletes">Your Recruits</Link><br />
            <Link className='nice-button' to="/visits">Your Visits</Link><br />
            <Link className='nice-button' to={`/teams/${curr_user.userInfo.team_id}`}>Your Team</Link><br />
            <Link className='nice-button' to={`/users/profile/${curr_user.user_id}`}>View Profile</Link><br />
            <Link className='nice-button' to="/users/edit">Edit Profile</Link><br />
        </div>
    }
}

export default Profile
