import React from 'react'
import Item from './item'

import { loadingSpinner, noResultsError } from 'site/siteSettings'
class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { items, settings } = this.props

        if(!items) { throw new Error("ASTEROID: 'Items' is not set, check pagination options.") }
        
        if (items.length > 0) {
            return items.map(
                (item) => {
                    //Look to see if there is an override for a list-item
                    if (settings.checkCustomDisplay('listItem')) { return settings.checkCustomDisplay('listItem')(item) }
                    //Otherwise do the default Item.
                    else { return <Item key={item[settings.fields.uniqueField]} item={item} update={this.props.update} settings={settings} /> }
                })
        } else {
            //Display whether its loading or missing results.
            return this.props.loader.loading ? loadingSpinner : noResultsError
        }

    }
}

export default Page
