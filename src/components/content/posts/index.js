import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

//API Related
import api from 'helpers/api'
import {curr_user, headers, Protect} from 'helpers/api'

//Related to search, sort, filter 
import {defaultLoader, checkParams, updatePage, checkLoad} from 'components/shared/search_helpers/search_helpers'

import Pagination from 'components/shared/search_helpers/pagination'
import Search from 'components/shared/search_helpers/search'
import Tags from 'components/shared/search_helpers/tag'
import Filter from 'components/shared/search_helpers/filter'
import Sort from 'components/shared/search_helpers/sort'

//Related to this component
import List from './components/list'



class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            tags: [],
            loader: defaultLoader({filter: 'public', sort: "created_at", sortdir: "DESC"})
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        //This make sures there a reason to call the api before doing so.
        checkLoad(this, pState)
    }

    loadPage = async (props = this.props) => {
        //Makes sure we have the correct params and sets update to false.
        const params = checkParams(this)
        const res = await axios.get(api.apiPath(`/posts` + '?' + params.toString()))
        const resTags = await axios.get(api.apiPath(`/posts/tag-cloud/${params.get('category')}`))
        updatePage(this, res, params, {posts: res.data.pageOfItems, tags: resTags.data})
    }
          

    render() {
        const { tags, posts } = this.state

        return <div>
            <h1>{posts[0] ? posts[0].blog_category : (this.state.loader.loading ? "LOADING" : "")}</h1>

            <div>
                <Protect role={3} kind={'admin_user'} join={'or'}>
                    Admin Filter: <Filter component={this} options={['draft', 'public', 'private']} />
                </Protect>
                <div className='search-helper-box'>
                    <Search component={this} />
                    <Sort component={this} options={[['created_at', 'Post Date'], ['blog_title', 'Alphabetical']]} />
                </div>

                <List posts={posts} />
                
                <Pagination component={this} />
                <Protect role={3} kind={'admin_user'} join={'or'}>
                    <Link to={`/posts/new`}>Add New Post +</Link>
                </Protect>
            </div>
            <div>
                <Tags component={this} tags={tags} />
            </div>
        </div>
    }
}

export default Page
