import React from 'react'
import axios from 'axios'
import api, { curr_user, headers, Protect } from 'helpers/api'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'


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

    render() {
        const item = this.state.item
        return <div>
            {Object.entries(item).map(pair => <div>
                {pair[0]}: {JSON.stringify(pair[1])}
            </div>)}

            <Link to={`${this.props.resourceSettings.name.urlPath}/${this.props.match.params.id}/edit`}>Edit</Link>
        </div>
    }
}

export default withRouter(Page)

