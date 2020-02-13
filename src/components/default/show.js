import React from 'react'
import axios from 'axios'
import api from 'helpers/api'
import { withRouter } from 'react-router'

//The loading spinner.
import { loadingSpinner, permissionError, missingError } from 'helpers/site'
//Contains the settings for the resource.
import { ResourceContext } from './components/resourceContext'
import settingHelper from 'db/settingHelpers'

import DefaultView from './components/defaultView'

class Show extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.permission = settingHelper.checkRender('view', this.settings)
        this.state = {
            item: {},
            loading: false
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
        if (this.permission) {
            await this.setState({ loading: true })
            axios
                .get(api.apiPath(`${this.settings.name.urlPath}/${this.props.match.params.id}`))
                .then(res => this.setState({ item: res.data }))
                .catch(err => console.log(err));
            await this.setState({ loading: false })
        }
    }

    render() {
        const item = this.state.item

        //Very first, check the permissions.
        if (this.permission) {
            //Then we see if there is any result pulled back.
            if (Object.entries(item).length > 0) {
                 //Then, see if we have a custom index display.
                let customDisplay = settingHelper.checkResourceDisplay('view', this.settings)
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

Show.contextType = ResourceContext
export default withRouter(Show)

