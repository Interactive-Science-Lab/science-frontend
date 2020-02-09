import React from 'react'

import {curr_user, headers} from 'helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { items, Item, settings } = this.props

        return <div>
                {items.map(
                    (item) => settings.display.list ? settings.display.list(item)
                    : <Item item={item} update={this.props.update} settings={settings} />
                )}
                { items.length === 0 ? (this.props.loader.loading ? "Loading" : "No Results.") : "" } 
            </div>

    }
}

export default Page
