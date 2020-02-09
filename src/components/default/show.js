import React from 'react'
import axios from 'axios'
import api, { curr_user, headers, Protect } from 'helpers/api'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { resourceFullFields } from 'db/defaultObjects'


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {}
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = (props = this.props) => {
        axios
            .get(api.apiPath(`${props.resourceSettings.name.urlPath}/${props.match.params.id}`))
            .then(res =>
                this.setState({ item: res.data })
            )
            .catch(err => console.log(err));
    }


    checkView = (settings) => {
        let ret = true
        if (settings[1].permissions) {
            const p = settings[1].permissions
            ret = p.indexOf('background') < 0 && p.indexOf('hidden') < 0 && p.indexOf('view-hidden') < 0
            if(p.indexOf('mod') >=0 || p.indexOf('admin') >=0 || p.indexOf('user') >=0 ||
                p.indexOf('view-mod') >=0 || p.indexOf('view-admin') >=0 || p.indexOf('view-user') >=0  ){
                ret = ret && curr_user ? true : false
            }
        }

        return ret
    }

    checkRender = (kind, settings) => {
        let ret = true
        ret = ret && settings.permissions[kind] !== 'none'
        if(['mod','user','admin'].indexOf(settings.permissions[kind]) >= 0) {
            ret = ret && curr_user ? true : false
        }
        return ret
        
    }

    render() {
        const item = this.state.item
        const settings = this.props.resourceSettings
        const friendlyName = settings.name.urlPath.substring(1)
        const fields = resourceFullFields(friendlyName, item)

        return <div>
            { this.checkRender('index', settings) ?
                <Link to={`${settings.name.urlPath}`}>Back To All</Link>
            : "" }

            { this.checkRender('view', settings) ? (settings.display.page ? 
                settings.display.page(item) : 
                Object.values(fields).map(field =>  <div>

                {this.checkView(field.settings) ? <div>
                    {field.settings[1].label ? <div>{field.name} :</div> : ""}

                
                    {field.settings[1].fieldType === 'string' ? <div>
                        {field.settings[1].titleField ? <h1>{field.value}</h1> : field.value}
                    </div> : ""}
                    {field.settings[1].fieldType === 'icon' ? <span className={`fas fa-${field.value}`}></span> : ""}
                    {field.settings[1].fieldType === 'local-image' ? <img src={`/images/${field.value}`} /> : ""}
                    {field.settings[1].fieldType === 'number' ? field.value : ""}
                    {field.settings[1].fieldType === 'text' ? field.value : ""}
                    {field.settings[1].fieldType === 'html' ? <div dangerouslySetInnerHTML={{ __html: field.value }} /> : ""}
                    {field.settings[1].fieldType[0] === 'select-draft' ? (field.value !== 'public' ? field.value : "") : ""}
                    {field.settings[1].fieldType[0] === 'select-open' ? field.value  : ""}
                    {field.settings[1].fieldType[0] === 'select-custom' ? field.value : ""}
                    {field.settings[1].fieldType === 'boolean' ? field.name + ": " + field.value : ""}
                    {field.settings[1].fieldType === 'object' ? <div>
                        {Object.entries(field.value || {}).map(f => <div>
                            {f[0]}: {JSON.stringify(f[1])}
                        </div>)}
                    </div> : ""}

                    {field.settings[1].fieldType === 'reference' ? "Reference " + field.name + ": " + field.value : ""}
                    
                    {field.settings[1].suffix}

                    </div> : ""}

                </div>)) : ""}
    
                {settings.features.user_info ? JSON.stringify(item.info) : ""}

                { this.checkRender('edit', settings) ?
                <Link to={`${this.props.resourceSettings.name.urlPath}/${this.props.match.params.id}/edit`}>Edit</Link>
                : "" }
            </div>
    }
            }
            
            export default withRouter(Page)
            
