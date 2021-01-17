import React from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import labSettings from './classes/fields'
import api from 'helpers/api'
import { curr_user } from 'helpers/api'

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

    UNSAFE_componentWillReceiveProps = (newProps) => {
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
            
            <NavLink to="/" style={{ background: 'none' }}>Logout</NavLink>
            

            <NavLink to={`/lab?l=${labKind}`} style={{ background: 'none' }}>Back To Experiments</NavLink>
            <h2 style={{ color: "white" }}>{item.experiment_name }</h2>
            {/*<p><i style={{ color: "grey", textAlign: "left" }}>{item.experiment_description}</i></p>
            <p style={{color: '#ccc', textAlign: "left"}}>{item.experiment_information}</p>*/}
            <h4 style={{ color: "white" }}>Method</h4>

            {item.experiment_steps?.split('#').map(step => 

            <div>{step ? <div>
                {step[0] === '-' ? 
                    <b><div style={{ color: "white", textAlign: "left", marginBottom: '15px' }}> <br /><u style={{ color: "white"}}> {step} </u></div></b> : 
                    <div style={{ color: "white", textAlign: "left", marginBottom: '15px' }}> #{step} </div> } 
                
                </div>: ""}
            
            </div>)}

            </div>


            : <div>
            <NavLink to="/" style={{ background: 'none', display: 'block' }}>Logout</NavLink>{items.length > 0 ? <div>
            <h4 style={{ color: "white", textShadow: '2px 2px 4px black'}} >Experiment List</h4>
                <p style={{ color: "grey" }}>Please choose an experiment for further instructions.</p>
                
                {
                items.sort((a,b) => a.experiment_order - b.experiment_order).map((i, x) => 
                <Link key={JSON.stringify(i) + x} className="experimentListName"  to={`/lab/${i.experiment_id}?l=${this.props.location.search.split('=')[1] || 'chemistry'}`}  
                style={{ display: 'block', padding: '15px', boxShadow: '2px 2px 4px black' }}>
<span className="fas fa-caret-right" style={{color: 'white', display: 'block', position: 'absolute', right:'15px', opacity: '.2'}}></span>
<h5 style={{ marginTop: "0", textAlign: 'left', textDecoration: 'none' }}><span style={{ color: "grey"}}>#{x+1}</span> <span style={{ color: "white"}}>{i.experiment_name}</span> </h5>
                    
                </Link>)
            }</div> : "-" }
            
            </div> }

            
        </div>
    }

}

export default withRouter(Header);
//
