import React from 'react'
import { Link } from 'react-router-dom'
import { stringifyDate } from '../../../shared/dateFormat'

import { curr_user, headers } from '../../../../helpers/api'

class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { item } = this.props

        return <div>
        <span className={`fas fa-${item.page_symbol}`}></span> {item.page_title} ({item.page_category})
        <Link to={`/pages/${item.site_page_id}`}>View</Link>
        <Link to={`/pages/${item.site_page_id}/edit`}>Edit</Link>
        </div>

    }
}

export default Item
