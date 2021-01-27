import React from 'react'


class Experiment extends React.Component {
    constructor(props) {
        super()

    }

    render() {
        let item = this.props.item
        return <>
            <h2 style={{ color: "white" }}>{item.experiment_name}</h2>

            <h4 style={{ color: "white" }}>Method</h4>

            {item.experiment_steps?.split('#').map(step =>

                <div key={step} >{step ? <div >
                    {step[0] === '-' ?
                        <b><div style={{ color: "white", textAlign: "left", marginBottom: '15px' }}> <br /><u style={{ color: "white" }}> {step} </u></div></b> :
                        <div style={{ color: "white", textAlign: "left", marginBottom: '15px' }}> #{step} </div>}

                </div> : ""}

                </div>)}
        </>
    }

}

export default Experiment