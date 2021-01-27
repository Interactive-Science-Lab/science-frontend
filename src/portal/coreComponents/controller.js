import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LogIn from './auth/logIn'
import Register from './auth/register'
import Verify from './auth/verify'
import Logout from './auth/logout'
import ForgottenPassword from './auth/forgottenPassword'
import ResetPassword from './auth/resetPassword'
import Dashboard from './account/dashboard'
import FourOhFour from 'structure/404Component'

import UserList from './account/userList'
import UserPage from './account/userPage'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {
    return <div>
      <Switch>
        <Route path="/auth/login" exact component={LogIn} />
        <Route path="/auth/register" exact component={Register} />
        <Route path="/auth/verify/:username/:verify_hash" exact component={Verify} />

        <Route path="/auth/forgottenPassword" exact component={ForgottenPassword} />
        <Route path="/auth/resetPassword/:username/:verify_hash" exact component={ResetPassword} />

        <Route path="/auth/dashboard" exact component={Dashboard} />
        <Route path="/auth/logout" exact component={Logout} />
        
        <Route path="/auth/user/list" exact component={UserList} />
        <Route path="/auth/user/:id" exact component={UserPage} />

        <Route path="/" component={FourOhFour} />

      </Switch>
    </div>
  }
}

export default User
