import React from 'react'
import { Link } from 'react-router-dom'
import { curr_user, headers, Protect } from 'helpers/api'

import Pagination from 'main/defaultComponent/helpers/search_helpers/pagination'
import Search from 'main/defaultComponent/helpers/search_helpers/search'
import Tags from 'main/defaultComponent/helpers/search_helpers/tag'
import Filter from 'main/defaultComponent/helpers/search_helpers/filter'
import Sort from 'main/defaultComponent/helpers/search_helpers/sort'

//Related to this component
import DefaultListComponent from './indexList'

class defaultIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }


    }


    displayOption = (component) => {
        return component
    }

    displayFilter = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.features.filter
        const filterPermissions = settings.options.filterOptions.permissions
        let filterCheck = true
        if(filterPermissions) { filterCheck = filterPermissions.checkPermission('index') }
        if (optionSettings && filterCheck) {
            const component = <Filter component={mainState} options={settings.options.filterOptions.options} />
            return this.displayOption(component, optionSettings)
        }
        else { return "" }
    }

    displaySearch = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.features.search
        if (optionSettings) {
            const component = <Search component={mainState} />
            return this.displayOption(component, optionSettings)
        }
        else { return "" }
    }

    displaySort = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.features.sort
        if (optionSettings) {
            const component = <Sort component={mainState} options={settings.options.sortOptions} />
            return this.displayOption(component, optionSettings)
        }
        else { return "" }
    }

    displayPagination = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.features.paginate
        if (optionSettings) {
            const component = <Pagination component={mainState} />
            return this.displayOption(component, optionSettings)
        }
        else { return "" }
    }

    displayTags = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.features.tags
        if (optionSettings) {
            const component = <Tags component={mainState} tags={mainState.state.tags} />
            return this.displayOption(component, optionSettings)
        }
        else { return "" }
    }

    displayNewLink = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.features.newLink
        let permissionCheck = settings.checkPermission('new') 
        if (optionSettings && permissionCheck) {
            const component = <Link to={`${settings.get("urlPath")}/new`}>{settings.text.newLink || "Add New +"}</Link>
            return this.displayOption(component, optionSettings)
        }
        else { return "" }
    }

    displayList = () => {
        const { settings, items, mainState } = this.props
        const component = <DefaultListComponent
            items={items}
            update={mainState.loadPage}
            loader={mainState.state.loader}
            settings={settings} />
        const optionSettings = settings
        if (optionSettings) { return this.displayOption(component, optionSettings) }
        else { return "" }
    }

    render() {
        const { settings } = this.props

        return <div>
            <h1>{settings.get("indexTitle")}</h1>
            <p>{settings.get("indexText")}</p>

            <div style={{display:'flex',justifyContent:'space-between',maxWidth:'800px',margin:'auto'}}>
                {this.displayFilter()}
                {this.displaySearch()}
                {this.displaySort()}
            </div>

            <div className='color-box'>
                {this.displayList()}
                {this.displayPagination()}
                {this.displayNewLink()}
            </div>

            <div>
                {this.displayTags()}
            </div>
        </div>
    }
}

export default defaultIndex
