import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { curr_user, headers } from 'helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        const { item } = this.props

        return <div>
                {item.support_ticket_name || item.support_ticket_email ? <span>
                        {item.support_ticket_name} / {item.support_ticket_email}
                    </span> : <span>Anonymous</span>} says:<br />
                <p>{item.support_ticket_message}</p>
                {item.support_ticket_state}
                {(item.support_ticket_state === 'pending' || item.support_ticket_state === 'open')
                && item.require_update ? "- requires update." : ""}<br />
                <Link to={`/support_tickets/${item.support_ticket_id}`}>View</Link> 

            </div>

    }n 
}

export default Page
