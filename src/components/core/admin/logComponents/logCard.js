import React from 'react'
import axios from 'axios'
import {Row, Col} from 'reactstrap'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }


class LogCard extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      showOriginalDetails: false,
      showChangeDetails: false,
      notes: ""
    }
  }

  verifyChange = (e) => {
    axios
        .put(`https://grimwire.herokuapp.com/api/logs/${this.props.logItem.log_id}/confirm`, {notes: this.state.notes}, headers)
        .then(res => {
          this.setState({logs: res.data})
          this.props.update();
        })
        .catch(err => console.log(err) );
  }


    undoChange = (e) => {
      axios
          .put(`https://grimwire.herokuapp.com/api/logs/${this.props.logItem.log_id}/undo`, {notes: this.state.notes}, headers)
          .then(res => {
            this.setState({logs: res.data})
            this.props.update();
          })
          .catch(err => console.log(err) );

    }

    toggleChangeDetails = () => {
      this.setState({showChangeDetails: !this.state.showChangeDetails})
    }


    toggleOriginalDetails = () => {
      this.setState({showOriginalDetails: !this.state.showOriginalDetails})
    }

  readableAction = () => {
    const log = this.props.logItem

    const actions = ['Create', 'Edit', 'Delete']
    const options = ['POST', 'PUT', 'DELETE']
    const printable_action = actions[options.indexOf(log.method)]

    let pathArray = log.route.split('/')
    pathArray = pathArray.slice(2, pathArray.length)
    pathArray = pathArray.map(name => name.charAt(0).toUpperCase() + name.slice(1) )
    const resourceName = pathArray.join(" ")

    return printable_action + " " + resourceName
  }

  readableRequest = () => {
    const log = this.props.logItem
    return log.method + " " + log.route + (log.object_id ? ('/' + log.object_id) : '')
  }

  handleChange = (e) => {
    this.setState({notes: e.target.value})
  }

  render = () => {
    const log = this.props.logItem
    return <Row>
      <Col>
        Submitter: { log.submitter_username }
      </Col>
      <Col>

        <div>
          Original <span onClick={this.toggleOriginalDetails}> {this.state.showOriginalDetails ? "(-)" : "(+)"} </span>:
          { this.state.showOriginalDetails ?
            JSON.stringify(log.previous) : ""
          }
        </div>

        <div>
          Changes <span onClick={this.toggleChangeDetails}> {this.state.showChangeDetails ? "(-)" : "(+)"} </span>:
          { this.state.showChangeDetails ?
            JSON.stringify(log.changes) : ""
          }
        </div>

      </Col>
      <Col>
        Action: { this.readableAction() }<br />
        Request:{ this.readableRequest() }
      </Col>
      <Col>
        {
          log.log_confirmed === true || log.log_confirmed === false ?
          (
            log.log_confirmed ? ("Verified by " + log.confirmer_username + (log.notes ? (": " + log.notes) : ''))
            :  ("Denied by" + log.confirmer_username + ": " + log.notes)
          ) :
          <span>
            Notes:
            <input type="text" onChange={this.handleChange} value={this.state.notes} /><br />
            <span onClick={this.verifyChange}>Verify</span>
            <span onClick={this.undoChange}>Undo</span>
          </span>
        }
      </Col>

    </Row>


  }
}

export default LogCard
