import React from 'react'
import {Form} from 'react-bootstrap'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import api from 'helpers/api'


import { UserContext } from 'main/asteroid/userContext'


class LogIn extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
          user: {
            username: params.get('class'),
            password: ""
          },
          formColor: 'transparent',
          error: null,
        }
    }

    handleChange = (e) => {
      this.setState({
          user: {
              ...this.state.user,
              [e.target.name]: e.target.value
          }
      })
    }

    handleLogin = (e) => {
      this.setState({formColor: 'rgba(255,255,255,.4)'})
      e.preventDefault();
      axios
          .post(api.loginPath(), this.state.user)
          .then(res => {
            this.setState({formColor: 'rgba(0,200,0,.4)'})
            const user = res.data.user
            this.context.login( user, res.data.token )
            if(user.user_kind === 'end_user') {

              setTimeout(() => { 
                  window.location.replace('/?loggedIn=true')
              }, 200)


            } else {
              setTimeout(() => {window.location.replace('/')}, 200)
            }

          })
          .catch((err, res) => {
            if(err.response.data.message === "Invalid Credentials.") {
              this.setState({formColor: 'rgba(200,0,0,.4)', error: "The information you entered does not match our records. Please try again."})
              setTimeout(() => {this.setState({formColor: 'transparent'})}, 2000)

            }
          });
    }

    render() {
        return <div className="tpBlackBg" >
          {this.state.error || ""}
            <Form className="color-box" onSubmit={this.handleLogin} style={{maxWidth:"800px", width:"100%", margin:"auto", backgroundColor: this.state.formColor}}>
                
          <h2>Login</h2>
                <Form.Group>
                    <Form.Label>Class name:</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="text"
                      name="username" placeholder="username"
                      value={this.state.user.username} />
                    <Form.Text>Please enter.</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Access code:</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="password"
                      name="password" placeholder="Password"
                      value={this.state.user.password} />
                    <Form.Text>Please enter.</Form.Text>
                </Form.Group>

                    <button type='submit'>Okie</button>
            </Form>
        </div>
    }
}


LogIn.contextType = UserContext

export default withRouter( LogIn )
