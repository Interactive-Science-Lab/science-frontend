import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'
import api from 'helpers/api'

import ExperimentList from './experimentList'
import Experiment from './experiment'

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            items: []
        }
    }



    componentDidMount = () => {
        this.loadPage()
    }

    UNSAFE_componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = async (props = this.props) => {
        let params = this.props.location.search.substr(1).split("&")
        let labKind = null
        let experiment_id = null
        let items = []
        let item = {}

        params.map((p) => {
            let pair = p.split('=')
            if (pair[0] === 'l') { labKind = pair[1] }
            else if (pair[0] === 'e') { experiment_id = pair[1] }
        })

        items = axios
            .get(api.apiPath(`/experiments`))
            .then(res => {

                let retExperiments = []
                res.data.map(
                    i => i.experiment_class === labKind ? retExperiments.push(i) : null
                )

                return retExperiments
            }
            )
            .catch(err => console.log(err));

        if (experiment_id) {
            item = axios
                .get(api.apiPath(`/experiments/${experiment_id}`))
                .then(res => res.data)
                .catch(err => console.log(err));
        }

        item = await Promise.resolve(item)
        items = await Promise.resolve(items)

        this.setState({ items, item })
    }



    render() {
        const { item, items } = this.state

        const labKind = this.props.location.search.split('=')[1].split("&")[0] || 'chemistry'
        if (!labKind) { console.log("Lab.Sidebar- labKind should not be null but is.") }

        if (item.experiment_id) {
            return <div>
                <NavLink to="/" style={{ background: 'none' }}>Logout</NavLink>
                <NavLink to={`/lab?l=${labKind}`} style={{ background: 'none' }}>Back To Experiments</NavLink>
                <Experiment item={item} />
            </div>
        } else {
            return <div>
                <NavLink to="/" style={{ background: 'none', display: 'block' }}>Logout</NavLink>
                {items.length > 0 ? <ExperimentList items={items} labKind={labKind} /> : "-LOADING-"}
            </div>
        }

    }

}

export default withRouter(Sidebar);

