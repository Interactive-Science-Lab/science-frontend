import React from 'react'
import { Link } from 'react-router-dom'

class ExperimentList extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        let items = this.props.items.sort((a, b) => a.experiment_order - b.experiment_order)
        let labKind = this.props.labKind
        console.log(items, labKind)
        return <div>

            <h4 style={{ color: "white", textShadow: '2px 2px 4px black' }} >Experiment List</h4>
            <p style={{ color: "grey" }}>Please choose an experiment for further instructions.</p>

            {
                items.map((i, x) => <Link key={JSON.stringify(i) + x} className="experimentListName" to={`/lab?l=${labKind}&e=${i.experiment_id}`}
                    style={{ display: 'block', padding: '15px', boxShadow: '2px 2px 4px black' }}>

                    <span className="fas fa-caret-right" style={{ color: 'white', display: 'block', position: 'absolute', right: '15px', opacity: '.2' }}></span>

                    <h5 style={{ marginTop: "0", textAlign: 'left', textDecoration: 'none' }}>
                        <span style={{ color: "grey" }}>#{x + 1}</span> <span style={{ color: "white" }}>
                            {i.experiment_name}
                        </span>
                    </h5>

                </Link>)
            }

        </div>


    }
}

export default ExperimentList