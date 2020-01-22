import React from 'react'
import { Link } from 'react-router-dom'
import { curr_user, headers, Protect } from 'helpers/api'

import Pagination from 'components/shared/search_helpers/pagination'
import Search from 'components/shared/search_helpers/search'
import Tags from 'components/shared/search_helpers/tag'
import Filter from 'components/shared/search_helpers/filter'
import Sort from 'components/shared/search_helpers/sort'

//Related to this component
import DefaultListComponent from './indexList'

class defaultIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }


    }


    displayOption = (component, optionSettings) => {
        //user, mod, admin, webmaster
        if (optionSettings.protection) {
            let protections = { role: 3, kind: 'admin_user', join: "and" }
            switch (optionSettings.protection) {
                case "webmaster":
                    protections = { role: 3, kind: 'admin_user', join: "and" }
                    break;
                case "admin":
                    protections = { role: 3, kind: 'admin_user', join: "or" }
                    break;
                case "mod":
                    protections = { role: 2, kind: 'mod_user', join: "or" }
                    break;
                case "user":
                    protections = { role: 1, kind: 'end_user', join: "or" }
                    break;
                default:
                    throw `Incorrect input for displayOptions- must be webmaster, admin, mod, or user.`
            }
            return <Protect role={protections.role} kind={protections.kind} join={protections.join}>
                {component}
            </Protect>

        } else {
            return component
        }
    }



    displayFilter = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.filter
        if (optionSettings) { 
            const component = <Filter component={mainState} options={settings.filter.options} />
            return this.displayOption(component, optionSettings) 
        }
        else { return "" }
    }

    displaySearch = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.search
        if (optionSettings) { 
            const component = <Search component={mainState} />
            return this.displayOption(component, optionSettings) 
        }
        else { return "" }
    }

    displaySort = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.sort
        if (optionSettings) { 
            const component = <Sort component={mainState} options={settings.sort.options} />
            return this.displayOption(component, optionSettings) 
        }
        else { return "" }
    }

    displayPagination = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.paginate
        if (optionSettings) { 
            const component = <Pagination component={mainState} />
            return this.displayOption(component, optionSettings) 
        }
        else { return "" }
    }

    displayTags = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.tags
        if (optionSettings) { 
            const component = <Tags component={mainState} tags={mainState.state.tags} />
            return this.displayOption(component, optionSettings) 
        }
        else { return "" }
    }

    displayNewLink = () => {
        const { settings, mainState } = this.props
        const optionSettings = settings.newLink
        if (optionSettings) { 
            const component = <Link to={`${settings.urlPath}/new`}>{settings.newLink.options || "Add New +"}</Link>
            return this.displayOption(component, optionSettings) 
        }
        else { return "" }
    }

    displayList = () => {
        const { settings, items, Item, mainState } = this.props
        const component = <DefaultListComponent
            items={items}
            Item={Item}
            update={mainState.loadPage}
            loader={mainState.state.loader} />
        const optionSettings = settings.resource
        if (optionSettings) { return this.displayOption(component, optionSettings) }
        else { return "" }
    }

    render() {
        const { settings } = this.props

        return <div>
            <h1>{settings.resource.title}</h1>

            <div>
                {this.displayFilter()}
                <div className='search-helper-box'>
                    {this.displaySearch()}
                    {this.displaySort()}
                </div>

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
