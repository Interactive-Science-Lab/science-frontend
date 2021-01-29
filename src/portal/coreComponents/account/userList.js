import React from 'react'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            loader: {}
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        //This make sures there a reason to call the api before doing so.
    }

    loadPage = async (props = this.props) => {
        //Makes sure we have the correct params and sets update to false.
        // const params = checkParams(this)
        // const res = await axios.get(api.apiPath(`${this.state.settings.name.urlPath}` + '?' + params.toString()), headers)
        // updatePage(this, res, params, { items: res.data.pageOfItems })
    }


    render() {
        return null
    }
}

export default Page
