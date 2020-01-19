import React from 'react'
import axios from 'axios'
import api from '../../../helpers/api'
import { curr_user, headers, Protect } from '../../../helpers/api'
import { Link } from 'react-router-dom'
import List from './components/list'


import { defaultLoader, checkParams, updatePage, checkLoad } from '../../shared/search_helpers/search_helpers'
import Pagination from '../../shared/search_helpers/pagination'
import Search from '../../shared/search_helpers/search'
import Filter from '../../shared/search_helpers/filter'
import Sort from '../../shared/search_helpers/sort'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
            loader: defaultLoader({ filter: 'public' })
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
        const res = await axios.get(api.apiPath(`/pages` + '?' + params.toString()))
        updatePage(this, res, params, { pages: res.data.pageOfItems })
    }

    render() {
        const pages = this.state.pages
        return <div className="tpBlackBg">
            <h1>Site Page List</h1>
            <Protect role={3} kind={'admin_user'} join={'or'}>
                Admin Filter: <Filter component={this} options={['draft', 'public', 'private']} />
            </Protect>
            <div className='search-helper-box'>
                <Search component={this} />
                <Sort component={this} options={[['page_title', 'Alphabetical'], ['page_category', 'Category'], ['page_order', 'Order']]} />
            </div>


            <List items={pages} />


            <Pagination component={this} />
            <Protect role={3} kind={'admin_user'} join={'or'}>
                <Link to={`/pages/new`}>Add New +</Link>
            </Protect>

        </div>
    }
}

export default Page
