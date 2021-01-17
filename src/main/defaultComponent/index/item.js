import React from 'react'
import { Link } from 'react-router-dom'
import FieldDisplay from '../display/fieldDisplay'


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {}
        }
    }

    render() {
        const {item, settings}  = this.props        
        let fields = settings.getItemFields(item)

        return <Link to={`${settings.get("urlPath")}/${item[settings.get('idField')]}`} style={{ display: "block" }}>
            {fields.map(field => <div key={field.settings.fieldName} >
                { field.settings.info.permission_id !== 3 &&  field.settings.info.permission_id !== 5 ?
                <FieldDisplay action={'index'} field={field} {...this.props} /> : "" }
                
            </div>
            )}
        </Link>

    }
}

export default Page
