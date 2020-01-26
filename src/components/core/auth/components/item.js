import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col } from 'reactstrap'
import api from 'helpers/api'
import { curr_user, headers, Protect } from 'helpers/api'

class UserCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  banUser = () => {
    axios
      .post(api.adminPath(`/ban/`), { user_id: this.props.item.user_id }, headers)
      .then(res => this.props.update())
      .catch(err => console.log(err));

  }

  unbanUser = () => {
    axios
      .post(api.adminPath(`/unban/`), { user_id: this.props.item.user_id }, headers)
      .then(res => this.props.update())
      .catch(err => console.log(err));

  }

  promote = (e) => {
    const role = e.target.getAttribute('data-role')
    axios
      .post(api.adminPath(`/promote/`), { user_id: this.props.item.user_id, user_role: Number.parseInt(role) }, headers)
      .then(res => this.props.update())
      .catch(err => console.log(err));
  }

  deleteUser = () => {
    window.confirm(`Are you sure you wish to delete user ${this.props.item.username}? There is no undo.`)
    axios
      .delete(api.userPath(`/${this.props.item.user_id}`), headers)
      .then(res => this.props.update())
      .catch(err => console.log(err));
  }

  render() {
    const user = this.props.item

    return <Row className="">
      <Col xs={12} lg={4}>
        {user.username}
      </Col>
      <Col xs={12} lg={4}>
        { user.user_kind === 'admin_user' ? "Staff " : "User " }
        {user.user_verified === true ? ['', '', 'Mod', 'Admin'][user.user_role] : ""}
        {user.user_verified === false ? "Banned" : ""}
        {user.user_verified === null ? "Unverified" : ""}
      </Col>
      <Col xs={12} lg={4}>
        <Link to={`/users/${user.user_id}`}>View</Link>

        {user.user_verified === false ? <span className="format-link" onClick={this.unbanUser}>Unban</span> : ""}
        {user.user_verified === true ? <span className="format-link" onClick={this.banUser}>Ban</span> : ""}
        {user.user_verified === null ? <span className="format-link" onClick={this.banUser}>Ban</span> : ""}


        {/*IF it's a verified user who is less than the current user's role*/}
        {user.user_verified === true && user.user_role <= curr_user.user_role ? (
          //IF the user is regular user, show the promote option.
          user.user_role === 1 ? <span data-role='2' className="format-link" onClick={this.promote}>Promote Mod</span> :

            (
              //If the user is moderator, show the demote & promote options
              user.user_role === 2 ? <span >
                <span data-role='1' className="format-link" onClick={this.promote}>Demote User</span>
                <span data-role='3' className="format-link" onClick={this.promote}>Promote Admin</span>
              </span> :
                //IF the user is an admin, show the demote option
                <span data-role='2' className="format-link" onClick={this.promote}>Demote Mod</span>
            )

        ) : ""}


        {user.user_role <= curr_user.user_role ?
          <span className="format-link" onClick={this.deleteUser}>Delete</span> : ""}

      </Col>

    </Row>
  }
}

export default UserCard
