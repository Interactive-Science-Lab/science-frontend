import React from 'react'
import axios from 'axios'

import FeedbackCard from './card.js'
import {apiPath} from '../../../../helpers/api'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class FeedbackIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      filter: "unlogged",
      lastFilter: "",
      loading: true,
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
        .get(apiPath(`/feedback`), headers)
        .then(res =>
          this.setState({feedbacks: res.data.pageOfItems, loading: false, lastFilter: this.state.filter})
        )
        .catch(err => console.log(err) );
  }

  toggleFilter = () => {
    this.setState({filter: this.state.filter === 'unlogged' ? 'all' : 'unlogged'})
  }

  render() {
      return <div>
        <h2>{this.state.filter === 'unlogged' ? 'Unseen Feedback' : 'All Feedback'}</h2>
        <span onClick={this.toggleFilter}>See {this.state.filter === 'unlogged' ? 'All Feedback' : 'Only Unseen Feedback'}</span><br />
        {
          this.state.feedbacks.length > 0 ?
          this.state.feedbacks.map(feedback => <div>
              <FeedbackCard feedback={feedback} update={this.loadPage}/><hr />
            </div>
          )
          : <div>{this.state.loading  ? "Loading." : "No Results."}</div>
        }
      </div>
  }
}


export default FeedbackIndex
