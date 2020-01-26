import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LogIn from './auth/logIn'
import Register from './auth/register'
import Verify from './auth/verify'
import Logout from './auth/logout'
import ForgottenPassword from './auth/forgottenPassword'
import ResetPassword from './auth/resetPassword'
import UserProfile from './userProfile'


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
        <Route path="/auth/login" exact render={() => <LogIn {...this.props} auth={this.props.auth} />} />
        <Route path="/auth/register" exact component={Register} />
        <Route path="/auth/verify/:username/:verify_hash" exact component={Verify} />

        <Route path="/auth/forgottenPassword" exact component={ForgottenPassword} />
        <Route path="/auth/resetPassword/:username/:verify_hash" exact component={ResetPassword} />


            <Route path="/auth/dashboard" exact component={UserProfile} />
            <Route path="/auth/logout" exact render={() => <Logout {...this.props} auth={this.props.auth} />} />f

        

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
