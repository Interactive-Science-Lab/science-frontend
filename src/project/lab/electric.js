import React from "react"

class Boat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentWire: 1,
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
            suffix = '-wire-glow.png'
        } else {
            suffix = '-wire.png'
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
                <b>Change Wire</b> <span style={{...xStyle, fontWeight: this.state.currentWire === 1 ? "bold" : "" }} onClick={this.changeWire} data-choice={1}> Thin </span>
                <span style={{...xStyle, fontWeight: this.state.currentWire === 2 ? "bold" : "" }} onClick={this.changeWire} data-choice={2}> Mid </span>
                <span style={{...xStyle, fontWeight: this.state.currentWire === 3 ? "bold" : "" }} onClick={this.changeWire} data-choice={3}> Thick </span>
            </div>

            <div style={{ backgroundColor: '#69C', borderRadius: '20px', border: '2px outset #333', margin: '10px 0' }}>
                <b>Change Volts</b> <span style={{...xStyle, fontWeight: this.state.currentVolts === 100 ? "bold" : "" }} onClick={this.changeVolts} data-choice={100}> Low </span>
                <span style={{...xStyle, fontWeight: this.state.currentVolts === 200 ? "bold" : "" }} onClick={this.changeVolts} data-choice={200}> Mid </span>
                <span style={{...xStyle, fontWeight: this.state.currentVolts === 300 ? "bold" : "" }} onClick={this.changeVolts} data-choice={300}> High </span>
            </div>

        </div>
    }
}

export default Boat