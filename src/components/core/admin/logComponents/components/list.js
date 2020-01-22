import React from 'react'
import Item from './card'

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
                    (item) => <Item item={item} update={this.props.update} />
                )}
               
            </div>

    }
}

export default Page
