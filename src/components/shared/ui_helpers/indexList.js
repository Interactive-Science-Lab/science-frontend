import React from 'react'

import {curr_user, headers} from 'helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { items, Item } = this.props

        return <div>
                {items.map(
                    (item) => <Item item={item} update={this.props.update} />
                )}
                { items.length === 0 ? (this.props.loader.loading ? "Loading" : "No Results.") : "" } 
            </div>

    }
}

export default Page
