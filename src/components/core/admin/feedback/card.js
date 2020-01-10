import React from 'react'
import axios from 'axios'
import {apiPath} from '../../../../helpers/api'

const FeedbackCard = (props) => {
  const {feedback} = props

  const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
  const headers = { headers: {'authorization': localStorage.token} }



  const logFeedback = (e) => {
    console.log(headers)
      axios
          .put(apiPath(`/feedback/confirm/${props.feedback.feedback_id}`), {}, headers)
          .then(res => {
            props.update();
          })
          .catch(err => console.log(err) );
    }


  return <div>
    { ['Bug Report', 'Question/Concern', 'Comment/Feedback', "I'd Like to Help Out", 'Other'][feedback.feedback_kind] }<br />
    Message: { feedback.feedback_message }<br />
    { feedback.feedback_name && feedback.feedback_email ? <div>
      Contact: "<i>{ feedback.feedback_name }</i>" at: <u>{feedback.feedback_email}</u>
    </div> : <p>By Anonymous</p> }
    { feedback.logged ? "Logged" : <span onClick={logFeedback}>Click To Log Feedback</span> }
  </div>

}

export default FeedbackCard
