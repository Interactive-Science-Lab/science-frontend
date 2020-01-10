import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'

import UserCard from './userList/userCard'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            searchTerm: "",
            searching: true
        }
    }

    componentDidMount = () => {
      this.loadPage();
    }

    loadPage = () => {
      axios
          .get(api.adminPath(`/user-list/${ this.searchTerm !== '' ? `?search=${this.state.searchTerm}` : ''}`), headers)
          .then(res =>
            this.setState({users: res.data, searching: false})
          )
          .catch(err => console.log(err) );
    }

    handleChange = async (e) => {
      await this.setState({searchTerm: e.target.value, searching: true})
      this.loadPage();
    }

    render() {
        const user = this.state.user
        return <div>

          <h2>Manage Users</h2>
          <h5>Total Users: {this.state.users.length}</h5>

          Search By Username: <input value={this.state.searchTerm} onChange={this.handleChange} />

          {
            this.state.users.length === 0 ? (this.state.searching ? "Loading" : "There are no results") : this.state.users.map((user, i) => <div>
                <UserCard key={user.user_id} user={user} number={i} update={this.loadPage}/>
              </div>
            )
          }
        </div>
    }
}

export default Page
