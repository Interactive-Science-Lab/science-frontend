import React from 'react'
import axios from 'axios'
import api, { curr_user, headers, Protect } from 'helpers/api'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { resourceFullFields } from 'db/defaultObjects'
import AutoField from './components/autoField'

import formHelpers from 'components/shared/forms/form_helpers'


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
            if (p.indexOf('mod') >= 0 || p.indexOf('admin') >= 0 || p.indexOf('user') >= 0 ||
                p.indexOf('view-mod') >= 0 || p.indexOf('view-admin') >= 0 || p.indexOf('view-user') >= 0) {
                ret = ret && curr_user ? true : false
            }
        }

        return ret
    }

    checkRender = (kind, settings) => {
        let ret = true
        ret = ret && settings.permissions[kind] !== 'none'
        if (['mod', 'user', 'admin'].indexOf(settings.permissions[kind]) >= 0) {
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
            {this.checkRender('index', settings) ?
                <Link to={`${settings.options?.back_to_all_link(item) || settings.name.urlPath}`}>Back To All</Link>
                : ""}

            {this.checkRender('view', settings) ? (settings.display.page ?
                settings.display.page(item) : <div>

                    <h1>{settings.name.view_title}</h1>
                    {Object.values(fields).map(field => <AutoField settings={settings} displayType={'view'} field={field} {...this.props} />)}
                
                </div>) : ""}



            {settings.features.user_info ? JSON.stringify(item.info) : ""}

            {this.checkRender('edit', settings) ?
                <Link to={`${this.props.resourceSettings.name.urlPath}/${this.props.match.params.id}/edit`}>Edit</Link>
                : ""}
        </div>
    }
}

export default withRouter(Page)

