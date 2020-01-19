import React from 'react'
import Item from './item'

import {curr_user, headers} from '../../../../helpers/api'

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    

    render() {
        const { items } = this.props

        return <div>
                {items.map(
                    (item) => <Item item={item} />
                )}
               
            </div>

    }
}

export default List
