import React from "react"

class Boat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentWire: 3,
            currentVolts: 100
        }
    }

    calculateAmps = () => {
        return this.state.currentVolts / this.state.currentWire
    }

    calculateEffect = () => {
        let a = this.calculateAmps()

        let suffix = ""

        let wire = ['', 'thin', 'mid', 'thick'][this.state.currentWire]

        if (a >= 300) {
            suffix = "-big-sparks.gif"
        } else if (a >= 200 && a <= 300) {
            suffix = "-sparks.gif"
        } else if (a >= 100 && a < 200) {
            suffix = '-wire-glow.gif'
        } else {
            suffix = '-wire.gif'
        }

        return wire + suffix

    }

    changeWire = (e) => {
        this.setState({ currentWire: Number.parseInt(e.target.getAttribute('data-choice')) })
    }

    changeVolts = (e) => {
        this.setState({ currentVolts: Number.parseInt(e.target.getAttribute('data-choice')) })
    }


    render() {

        let xStyle = {
            fontSize: '16px',
            color: '#9ACDE7',
            cursor: 'pointer',
            background: "#1B2B38",
            border: '1px outset #888',
            padding: '10px 30px',
            margin: '10px',
            borderRadius: '6px',
            display: 'inline-block'
        }



        return <div style={{ width: '480px' }}>
            <img src={`/images/${this.calculateEffect()}`} height='320px' width='480px' />



            <div style={{ backgroundColor: '#69C', borderRadius: '20px', border: '2px outset #333', margin: '10px 0' }}>
                <b>Resistance (Ohms)</b> 
                <span style={{...xStyle, fontWeight: this.state.currentWire === 3 ? "bold" : "", textDecoration: this.state.currentWire === 3 ? "underline" : "", color: this.state.currentWire === 3 ? "white" : "#9ACDE7" }} onClick={this.changeWire} data-choice={3}> 6 </span>
                <span style={{...xStyle, fontWeight: this.state.currentWire === 2 ? "bold" : "", textDecoration: this.state.currentWire === 2 ? "underline" : "", color: this.state.currentWire === 2 ? "white" : "#9ACDE7" }} onClick={this.changeWire} data-choice={2}> 8 </span>
        
                
                <span style={{...xStyle, fontWeight: this.state.currentWire === 1 ? "bold" : "", textDecoration: this.state.currentWire === 1 ? "underline" : "", color: this.state.currentWire === 1 ? "white" : "#9ACDE7" }} onClick={this.changeWire} data-choice={1}> 12 </span>
                     </div>

            <div style={{ backgroundColor: '#69C', borderRadius: '20px', border: '2px outset #333', margin: '10px 0' }}>
                <b>Volts</b> <span style={{...xStyle, fontWeight: this.state.currentVolts === 100 ? "bold" : "", textDecoration: this.state.currentVolts === 100 ? "underline" : "", color: this.state.currentVolts === 100 ? "white" : "#9ACDE7" }} onClick={this.changeVolts} data-choice={100}> 60 </span>
                <span style={{...xStyle, fontWeight: this.state.currentVolts === 200 ? "bold" : "", textDecoration: this.state.currentVolts === 200 ? "underline" : "", color: this.state.currentVolts === 200 ? "white" : "#9ACDE7"  }} onClick={this.changeVolts} data-choice={200}> 120 </span>
                <span style={{...xStyle, fontWeight: this.state.currentVolts === 300 ? "bold" : "", textDecoration: this.state.currentVolts === 300 ? "underline" : "", color: this.state.currentVolts === 300 ? "white" : "#9ACDE7"  }} onClick={this.changeVolts} data-choice={300}> 220 </span>
            </div>

        </div>
    }
}

export default Boat