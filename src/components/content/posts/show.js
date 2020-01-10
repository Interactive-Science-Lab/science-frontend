import React from 'react'
import axios from 'axios'
import api from '../../../helpers/api'
import { Link } from 'react-router-dom'
import { stringifyDate } from '../../shared/dateFormat'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {}
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = (props = this.props) => {
        axios
            .get(api.apiPath(`/posts/${props.match.params.id}`))
            .then(res =>
              this.setState({post: res.data})
            )
            .catch(err => console.log(err) );
    }

    render() {
        const post = this.state.post
        return Object.keys(post).length > 0 ? <div className="tpBlackBg">
            {curr_user.user_role === 3 ? <Link to={`/posts/${post.site_blog_id}/edit`}>Edit</Link> : ""}
            <Link to={`/posts?category=${post.blog_category}`}>Back to All</Link>
          <h1>{post.blog_title}</h1>
          <p>{post.blog_description}</p>
          
          By {post.author_username} {stringifyDate(post.created_at)}
          <p> Tags: {post.blog_tags.join(', ')}</p>
          <hr />
          
          <div dangerouslySetInnerHTML={{__html: post.blog_text}} />
        </div> : ""
    }
}

export default Page
