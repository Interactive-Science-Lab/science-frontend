import React from 'react'
import { Link } from 'react-router-dom'
import { stringifyDate } from '../../../shared/dateFormat'

import { curr_user, headers } from '../../../../helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { post } = this.props

        return <Link to={`/posts/${post.site_blog_id}`} style={{ display: "block" }}>
            <h4>{post.blog_title}</h4>
            By {post.author_username} {stringifyDate(post.created_at)}
            <p>{post.blog_description}</p>
            {post.blog_tags.map(tag => <Link to={`/posts?category=${post.blog_category}&tag=${tag}`} > {tag} </Link>)}
        </Link>

    }
}

export default Page
