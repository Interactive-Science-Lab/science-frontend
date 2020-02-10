import React from 'react'
import axios from 'axios'

import {withRouter} from 'react-router-dom'

//API Related
import api from 'helpers/api'

//Related to search, sort, filter 
import {defaultLoader, checkParams, updatePage, checkLoad} from 'components/shared/search_helpers/search_helpers'

//Related to this component
import DefaultIndex from 'components/shared/ui_helpers/defaultIndex'
import ItemComponent from './components/item'



class Page extends React.Component {
    constructor(props) {
        super(props)
        console.log(props, this.props)
        this.state = {
            items: [],
            tags: [],
            loader: defaultLoader(props.resourceSettings.loader),
            settings:  props.resourceSettings
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        //This make sures there a reason to call the api before doing so.
        checkLoad(this, pState, pProps)
    }

    loadPage = async (props = this.props) => {
        //Makes sure we have the correct params and sets update to false.
        const params = checkParams(this)
        const res = await axios.get(api.apiPath('/'+ props.resourceSettings.name.urlPath + '?' + params.toString()))
        let updateObj = {
            items: res.data.pageOfItems,
            //loader: defaultLoader(props.resourceSettings.loader),
            settings:  props.resourceSettings
        }
        if(props.resourceSettings.features.tags) {
            const resTags = await axios.get(api.apiPath('/'+ props.resourceSettings.name.urlPath + `/tag-cloud/${params.get('category')}`))
            updateObj.tags = resTags.data
        }
        updatePage(this, res, params, updateObj)
    }
          

    render() {
        const { items, settings } = this.state
        

        return <div>
            <DefaultIndex Item={ItemComponent} items={items} settings={settings} mainState={this} />
        </div>
    }
}

export default withRouter(Page)
