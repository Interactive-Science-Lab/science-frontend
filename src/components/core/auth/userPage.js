import React from 'react'
import axios from 'axios'
import api, { curr_user } from 'helpers/api'
import { Protect } from 'helpers/api'

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount = () => {
    axios
      .get(api.userPath(`/${this.props.match.params.id}`))
      .then(res =>
        this.setState({ user: res.data })
      )
      .catch(err => console.log(err));
  }

  render() {
    const user = this.state.user
    return <div className="tpBlackBg">
      <div>
        <span style={{ height: "50px", width: "50px", display: "inline-block", margin: '5px' }}>
          {user.thumbnail ? <img src={user.thumbnail.image_url} style={{ width: '100%' }} /> : ""}
        </span>
        <h2 style={{ display: "inline-block" }}>{user.username}</h2>
      </div>
      <p>{user.user_kind === 'admin_user' ? "Staff" : "User"} {['', '', 'Mod', 'Admin'][user.user_role]}</p>

      <div>
        <p>Status: {user.user_verified ? "Verified" : (user.user_verified === false ? "Banned" : "Unverified")}</p>
        <Protect role={3} >
          <p>Notes: {user.ban_notes || <i>No notes.</i>} </p>
          <p>Account Email: {user.user_email} </p>
          {
            user.user_kind === 'admin_user' ? <div>
              <p>Phone: {user.info.phone_number}</p>
              <p>Public Email: {user.info['public-email']}</p>
            </div> : ""
          }
        </Protect>
      </div>

      {
        user.user_kind === 'end_user' ? <div>
          <p>Name: {user.info.user_full_name || <i>No name provided</i>}</p>
          <p>Bio: {user.info.user_bio || <i>No bio provided</i>} </p>
          <p>
            Link/Website:
                {user.user_link ?
              <a href={user.info.user_link}>{user.info.user_link_description || "My Website"}</a> : <i>No link provided.</i>}
          </p>
        </div> : ""
      }

    </div>
  }
}

export default Page
