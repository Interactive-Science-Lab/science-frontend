import React from 'react'
import axios from 'axios'
import api from '../../../helpers/api'
import { Link } from 'react-router-dom'
import { stringifyDate } from '../../shared/dateFormat'

import {curr_user, headers, Protect} from '../../../helpers/api'


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
            <Protect role={3} kind={'admin_user'} join={'or'}>
                <Link to={`/posts/${post.site_blog_id}/edit`}>Edit</Link>
            </Protect>
            <Link to={`/posts?category=${post.blog_category}`}>Back to All</Link>

            <div style={{height: "300px", overflow: "hidden"}}>
                <img src={post.thumbnail ? post.thumbnail.image_url : ""} style={{width:'100%'}} />                   
            </div>
            <p>{post.image_source}</p>

          <h1>{post.blog_title}</h1>
          <p>{post.blog_description}</p>
          
          By {post.author_username} {stringifyDate(post.created_at)}
          <p> Tags: {post.blog_tags.map(tag => 
        <Link to={`/posts?category=${post.blog_category}&tag=${tag}`} >{tag}</Link>)}</p>
          

          <hr />
          
          <div dangerouslySetInnerHTML={{__html: post.blog_text}} />
        </div> : ""
    }
}

export default Page

