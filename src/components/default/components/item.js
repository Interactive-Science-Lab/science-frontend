import React from 'react'
import { Link } from 'react-router-dom'

import { curr_user, headers } from 'helpers/api'

import {findResourceSettings} from 'db/defaultObjects'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const {item, settings}  = this.props
        console.log(settings)

        return <Link to={`${settings.name.urlPath}/${item[settings.idField]}`} style={{ display: "block" }}>
            {Object.entries(item).map(pair => <div>
                {pair[0]}: {JSON.stringify(pair[1])}
            </div>)}
        </Link>

    }
}

export default Page
