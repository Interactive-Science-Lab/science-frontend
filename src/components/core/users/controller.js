import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LogIn from './auth/logIn'
import Register from './auth/register'
import Verify from './auth/verify'
import Logout from './auth/logout'
import ForgottenPassword from './auth/forgottenPassword'
import ResetPassword from './auth/resetPassword'

import UserPage from './userPage'
import UserList from './userList'
 
 
import UserProfile from './userProfile'
import EditUser from './userForm'


const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {
    return <div>
      <Switch>
        <Route path="/users/login" exact render={() => <LogIn {...this.props} auth={this.props.auth} />} />
        <Route path="/users/register" exact component={Register} />
        <Route path="/users/verify/:username/:verify_hash" exact component={Verify} />

        <Route path="/users/forgottenPassword" exact component={ForgottenPassword} />
        <Route path="/users/resetPassword/:username/:verify_hash" exact component={ResetPassword} />


            <Route path="/users/dashboard" exact component={UserProfile} />
            <Route path="/users/edit" exact component={EditUser} />
            <Route path="/users/logout" exact render={() => <Logout {...this.props} auth={this.props.auth} />} />

            <Route path="/users/list" exact component={UserList} />
            <Route path="/users/:id" exact component={UserPage} />

        

        <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
          <h2>We're Sorry</h2>
          <h1>ERROR: 404 Page Not Found</h1>
          <hr />
          <h3>If you have accessed this page before:</h3>
          <h4>Staff</h4> 
          <p>Please try logging out and logging back in.</p>
          <h4>Athletes</h4> 
          <p>Please directly message the number for the team.</p>
          <hr />
          <p>Error Code: <i>ACCOUNT_ERROR</i></p>
        </div></div>} />


      </Switch>
    </div>
  }
}

export default User
