import React from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import labSettings from './classes/fields'
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
                .then(res => {
                        const labKind = props.location.search.split('=')[1] || 'chemistry'
                        let retExperiments = []
                        res.data.map( 
                            i => i.experiment_class === labKind ? retExperiments.push(i) : null 
                        )
                        this.setState({ items: retExperiments, item: {} })
                    }
                )
                .catch(err => console.log(err));
        }
    }

    render() {
        const {item, items} = this.state
        
        const labKind = this.props.location.search.split('=')[1] || 'chemistry'
        return <div>
            {item.experiment_id ? <div>
            
            <NavLink to="/" style={{ background: 'none' }}>Back to Home</NavLink>
            <NavLink to={`/lab?l=${labKind}`} style={{ background: 'none' }}>Back To Experiments</NavLink>
            <h2 style={{ color: "white" }}>{item.experiment_name }</h2>
            <p><i style={{ color: "grey", textAlign: "left" }}>{item.experiment_description}</i></p>
            <p style={{color: '#ccc', textAlign: "left"}}>{item.experiment_information}</p>
            <h4 style={{ color: "white" }}>Method</h4>

            {item.experiment_steps?.split('#').map(step => <div style={{ color: "white", textAlign: "left", marginBottom: '15px' }}>{step ? "#" + step : ""}</div>)}

            </div>


            : <div>

            <NavLink to="/" style={{ background: 'none', display: 'block' }}>Back to Home</NavLink>{items.length > 0 ? <div>
                <p style={{ color: "grey" }}>Please choose an experiment for further instructions.</p>{
                items.map((i, x) => <Link to={`/lab/${i.experiment_id}?l=${this.props.location.search.split('=')[1] || 'chemistry'}`}  style={{ display: 'block', background: 'none' }}>
                    <p style={{ color: "grey", marginBottom: "0" }}>Experiment #{x+1}:</p>
                    <h4 style={{ color: "white", marginTop: "0" }}> {i.experiment_name}</h4>
                </Link>)
            }</div> : "-" }
            
            </div> }

            
        </div>
    }

}

export default withRouter(Header);
//
