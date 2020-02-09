import React from 'react'
import { Link } from 'react-router-dom'

import { resourceFullFields } from 'db/defaultObjects'

import { curr_user, headers } from 'helpers/api'

import {findResourceSettings} from 'db/defaultObjects'

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
            {Object.values(fields).map(field => <div>

                { this.checkView(field.settings) ? <div>
                    {field.settings[1].label ? <div>{field.name} :</div> : ""}

                    {field.settings[1].fieldType === 'string' ? <div>
                        {field.settings[1].titleField ? <h3>{field.value}</h3> : field.value}
                    </div> : ""}
                    {field.settings[1].fieldType === 'icon' ? <span className={`fas fa-${field.value}`}></span> : ""}
                    {field.settings[1].fieldType === 'text' ? field.value : ""}
                    {field.settings[1].fieldType === 'html' ? <div dangerouslySetInnerHTML={{ __html: field.value }} /> : ""}
                    {field.settings[1].fieldType[0] === 'select-draft' ? (field.value !== 'public' ? field.value : "") : ""}
                    {field.settings[1].fieldType[0] === 'select-custom' ? field.value : ""}
                    {field.settings[1].fieldType[0] === 'select-custom-int' ? field.settings[1].fieldType[1][field.value] : ""}
                    {field.settings[1].fieldType === 'boolean' ? field.name + ": " + field.value : ""}
                    {field.settings[1].fieldType === 'object' ? <div>
                        {field.name}<br />
                        {Object.entries(field.value || {}).map(f => <div>
                            {f[0]}: {JSON.stringify(f[1])}
                        </div>)}
                    </div> : ""}

                    {field.settings[1].fieldType === 'reference' ? "Reference " + field.name + ": " + field.value : ""}
                </div> : "" }
            
            </div>)}
        </Link>

    }
}

export default Page
