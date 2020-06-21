import React from 'react'
import { Link } from 'react-router-dom'
import FieldDisplay from './fieldDisplay'


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {}
        }
    }

    render() {
        const {item, settings}  = this.props        
        const fields = settings.getItemFields(item)

        return <Link to={`${settings.get("urlPath")}/${item[settings.fields.idField]}`} style={{ display: "block" }}>
            {fields.map(field => <div>
                
                <FieldDisplay action={'index'} field={field} {...this.props} /> 
                
            </div>
            )}
        </Link>

    }
}

export default Page
