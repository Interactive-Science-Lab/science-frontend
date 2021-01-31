import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'
import api from 'helpers/api'

import ExperimentList from './experimentList'
import Experiment from './experiment'

import {labKindHelper} from '../../classes/fields'

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            items: []
        }

        this.labKind = labKindHelper(props)
    }



    componentDidMount = () => {
        this.loadPage()
    }

    UNSAFE_componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = async (props = this.props) => {
        this.labKind = labKindHelper(props)
        let params = this.props.location.search?.substr(1).split("&") || []
        let experiment_id = null
        let items = []
        let item = {}

        params.map((p) => {
            let pair = p.split('=')
            if (pair[0] === 'e') { experiment_id = pair[1] }
        })

        items = axios
            .get(api.apiPath(`/experiments`))
            .then(res => {
                let retExperiments = []
                res.data.map(
                    i => i.experiment_class === this.labKind ? retExperiments.push(i) : null
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

        if (item.experiment_id) {
            return <div>
                <NavLink to="/" style={{ background: 'none' }}>Logout</NavLink>
                <NavLink to={`/lab?l=${this.labKind}`} style={{ background: 'none' }}>Back To Experiments</NavLink>
                <Experiment item={item} />
            </div>
        } else {
            return <div>
                <NavLink to="/" style={{ background: 'none', display: 'block' }}>Logout</NavLink>
                {items.length > 0 ? <ExperimentList items={items} labKind={this.labKind} /> : "-LOADING-"}
            </div>
        }

    }

}

export default withRouter(Sidebar);

