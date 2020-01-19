import React from 'react'
import axios from 'axios'
import api from '../../../../../helpers/api'
import { curr_user, headers } from '../../../../../helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    
   logFeedback = (e) => {
      axios
          .put(api.apiPath(`/feedback/confirm/${this.props.item.feedback_id}`), {}, headers)
          .then(res => {
            this.props.update();
          })
          .catch(err => console.log(err) );
    }

    render() {
        const { item } = this.props

        return <div>
                <h3>{['Bug Report', 'Question/Concern', 'Comment/Feedback', "I'd Like to Help Out", 'Other'][item.feedback_kind]}</h3>

                <div>
                    {item.feedback_name || item.feedback_email ? <span>
                        {item.feedback_name} / {item.feedback_email}
                    </span> : <span>Anonymous</span>} says:<br />
                    <i>{item.feedback_message}</i><br />
                    {item.logged ? "" : <span className="format-link" onClick={this.logFeedback}>Mark Read</span>}
                </div>

            </div>

    }
}

export default Page
