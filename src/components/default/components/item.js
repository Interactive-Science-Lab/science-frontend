import React from 'react'
import { Link } from 'react-router-dom'
import { resourceFullFields } from 'db/defaultObjects'
import AutoField from './autoField'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    checkView = (settings) => {
        let ret = true
        if(settings[1].permissions) {
            const p = settings[1].permissions
            ret = p.indexOf('background') < 0 && p.indexOf('hidden') < 0 && p.indexOf('list-hidden') < 0
        }

        return ret
    }

    render() {
        const {item, settings}  = this.props        
        const fields = resourceFullFields(settings.name.urlPath.substring(1), this.props.item)

        return <Link to={`${settings.name.urlPath}/${item[settings.idField]}`} style={{ display: "block" }}>
            {Object.values(fields).map(field => <AutoField displayType={'list'} field={field} {...this.props} /> )}
        </Link>

    }
}

export default Page
