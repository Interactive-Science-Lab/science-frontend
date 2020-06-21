import React from 'react'
import axios from 'axios'
import api from 'helpers/api'
import { withRouter } from 'react-router'


import { loadingSpinner, permissionError, missingError } from 'site/siteSettings'
//Contains the settings for the resource.
import { ResourceContext } from './components/resourceContext'

import DefaultView from './components/defaultView'

class View extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {
            item: {},
            loading: true,
            permission: true
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        //This make sures there a reason to call the api before doing so.
        if (this.props.match.params.id !== pProps.match.params.id) { this.loadPage() }
    }

    loadPage = async () => {
        //Get the actual item from the db. 
        if (this.state.permission) {
            await this.setState({ loading: true })
            axios
                .get(api.apiPath(`${this.settings.get('urlPath')}/${this.props.match.params.id}`))
                .then(res => this.setState({ item: res.data, permission: this.settings.checkPermission('view', res.data)  }))
                .catch(err => console.log(err));
            await this.setState({ loading: false})
        }
    }

    render() {
        const item = this.state.item

        //Very first, check the permissions.
        if (this.state.permission) {
            //Then we see if there is any result pulled back.
            if (Object.entries(item).length > 0) {
                 //Then, see if we have a custom index display.
                let customDisplay = this.settings.checkCustomDisplay('view')
                if (customDisplay) {
                    //If so, go ahead and do the custom display.
                    return customDisplay(item)
                } else {
                    //If not, do the default view.
                    return <DefaultView item={item} />
                }
            } else {
                //Display the loading spinner.
                if (this.state.loading) { return loadingSpinner }
                //Another error page.
                else { return missingError }
            }
        } else {
            //Error display
            return permissionError
        }
    }
}

View.contextType = ResourceContext
export default withRouter(View)

