import React from 'react'
import { Link } from 'react-router-dom'
import { resourceFullFields } from 'db/defaultObjects'
import FieldDisplay from './fieldDisplay'


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const {item, settings}  = this.props        
        const fields = resourceFullFields(settings, item)

        return <Link to={`${settings.name.urlPath}/${item[settings.idField]}`} style={{ display: "block" }}>
            {Object.values(fields).map(field => <div>
                <FieldDisplay displayType={'list'} field={field} {...this.props} /> 
                </div>
            )}
        </Link>

    }
}

export default Page
