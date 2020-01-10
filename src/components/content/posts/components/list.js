import React from 'react'
import Item from './item'

import {curr_user, headers} from '../../../../helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { posts } = this.props

        return <div>
                {posts.map(
                    (post) => <Item post={post} />
                )}
               
            </div>

    }
}

export default Page
