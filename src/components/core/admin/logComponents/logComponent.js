import React from 'react'
import axios from 'axios'
import api from '../../../helpers/api'

import LogCard from './userLogs/logCard'


const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logs: [],
            filter: "unconfirmed",
            lastFilter: ""
        }
    }

    componentDidMount = () => {
      this.loadPage();
    }

    componentDidUpdate = () => {
      if(this.state.filter !== this.state.lastFilter) {
        this.loadPage();
      }
    }

    loadPage = () => {
      axios
          .get(api.apiPath(`/logs/${this.state.filter}`), headers)
          .then(res =>
            this.setState({logs: res.data, lastFilter: this.state.filter})
          )
          .catch(err => console.log(err) );
    }

    clearAll = async () => {
      await axios.put(`https://grimwire.herokuapp.com/api/logs/confirm_all`, {}, headers)
      this.loadPage();
    }

    toggleFilter = () => {
      this.setState({filter: this.state.filter === 'unconfirmed' ? 'all' : 'unconfirmed'})
    }

    render() {
        return <div>
          <p className="format-link" onClick={this.clearAll}>Clear All</p>
          <h2>{this.state.filter === 'unconfirmed' ? 'Unconfirmed Logs' : 'All Logs'}</h2>
          <span className="format-link" onClick={this.toggleFilter}>See {this.state.filter === 'unconfirmed' ? 'All Logs' : 'Only Unconfirmed Logs'}</span><br />
          {
            this.state.logs.length > 0 ?
            this.state.logs.map(log => <div>
                <LogCard logItem={log} update={this.loadPage}/><hr />
              </div>
            )
            : <div>{this.state.filter === this.state.lastFilter ? "No results." : "Loading."}</div>
          }
        </div>
    }
}

export default Page
