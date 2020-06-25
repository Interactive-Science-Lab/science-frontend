import React from 'react'
import axios from 'axios'
import api from 'helpers/api'

/** This component is for displaying a user profile to another user */

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
    return JSON.stringify(user)
  }
}

export default Page
