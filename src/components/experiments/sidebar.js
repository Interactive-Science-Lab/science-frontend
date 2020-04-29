import React from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import api from 'helpers/api'

class Header extends React.Component {
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

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = (props = this.props) => {
        const id = props.match.params.id
        if(id) {
            axios
                .get(api.apiPath(`/experiments/${id}`))
                .then(res =>
                    this.setState({ item: res.data, items: [] })
                )
                .catch(err => console.log(err));
        } else {
            axios
                .get(api.apiPath(`/experiments`))
                .then(res =>
                    this.setState({ items: res.data.pageOfItems, item: {} })
                )
                .catch(err => console.log(err));
        }
    }

    render() {
        const {item, items} = this.state
        return <div>
            {item.experiment_id ? <div>
                
            <NavLink to="/" style={{ background: 'none' }}>Home</NavLink>
            <NavLink to="/lab" style={{ background: 'none' }}>Experiments</NavLink>
            <h2 style={{ color: "white" }}>#{this.props.match.params.id}. {item.experiment_name }</h2>
            <p><i style={{ color: "grey" }}>{item.experiment_description}</i></p>
            <p style={{color: '#ccc'}}>{item.experiment_information}</p>
            <h4 style={{ color: "white" }}>Method</h4>
            </div>
            : <div>
            <NavLink to="/" style={{ background: 'none', display: 'block' }}>Home</NavLink>{items.length > 0 ? <div>
                <p style={{ color: "grey" }}>Please choose an experiment, or continue in sandbox mode.</p>{
                items.map(i => <Link to={`/lab/${i.experiment_id}`}  style={{ display: 'block' }}>
                    <p style={{ color: "white" }}>#{i.experiment_order} {i.experiment_name}
                   </p>  
                </Link>)
            }</div> : "-" }</div> }

            {item.experiment_steps?.split('#').map(step => <div style={{ color: "white" }}>{step ? "#" + step : ""}</div>)}
        </div>
    }

}

export default withRouter(Header);
//
