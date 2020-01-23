import React from 'react'
import axios from 'axios'

//API Related
import api from 'helpers/api'

//Related to search, sort, filter 
import {defaultLoader, checkParams, updatePage, checkLoad} from 'components/shared/search_helpers/search_helpers'

//Related to this component
import DefaultIndex from 'components/shared/ui_helpers/defaultIndex'
import ItemComponent from './components/item'


import {allResourceSettings} from 'db/defaultObjects'
const resourceSettings = allResourceSettings.site_blog


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            tags: [],
            loader: defaultLoader(resourceSettings.loader),
            settings:  resourceSettings
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
        updatePage(this, res, params, {items: res.data.pageOfItems, tags: resTags.data})
    }
          

    render() {
        const { items, settings } = this.state
        

        return <div>
            <DefaultIndex Item={ItemComponent} items={items} settings={settings} mainState={this} />
        </div>
    }
}

export default Page
