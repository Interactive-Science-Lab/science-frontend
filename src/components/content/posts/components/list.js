import React from 'react'
import Item from './item'

import {curr_user, headers} from 'helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { items } = this.props

        return <div>
                {items.map(
                    (item) => <Item post={item} />
                )}
                { items.length === 0 ? (this.props.loader.loading ? "Loading" : "No Results.") : "" } 
            </div>

    }
}

export default Page
