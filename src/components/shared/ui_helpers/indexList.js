import React from 'react'

import {loadingSpinner, permissionError, noResultsError} from 'helpers/site'
class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { items, Item, settings } = this.props

        return <div>
                
                { 
                items.length === 0 ? 
                    ( this.props.loader.loading ? loadingSpinner : noResultsError ) : 
                    items.map(
                        (item) => settings.display.list ? settings.display.list(item)
                        : <Item item={item} update={this.props.update} settings={settings} />
                    )
                }
                
            </div>

    }
}

export default Page
