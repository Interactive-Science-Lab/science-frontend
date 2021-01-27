import React from "react"
import { LabContext } from 'lab/labContext'

class Boat extends React.Component {
    static contextType = LabContext
    constructor(props) {
        super(props)
        this.state = {
            currentNumber: 0,
            waterArr: [127.2,
                332.1,
                543.0,
                761.9,
                974.5,
                1188.7,
                1403.4]
        }
    }

    boatHeight = () => {
        return `${36 - this.state.currentNumber * 3}%`
    }
    ballHeight = () => {
        return `${68 - this.state.currentNumber * 3}%`
    }

    waterHeight = () => {
        return `${42 + this.state.currentNumber * 1.5}%`
    }

    increaseBalls = () => {
        this.context.state.sounds.click.play(this.context.state)
        if (this.state.currentNumber < 6) {
            this.setState({ currentNumber: this.state.currentNumber + 1 })
        }
    }

    decreaseBalls = () => {
        this.context.state.sounds.click.play(this.context.state)
        if (this.state.currentNumber > 0) {
            this.setState({ currentNumber: this.state.currentNumber - 1 })
        }
    }

    printBalls = () => {
        let i = this.state.currentNumber
        let ret = []

        for (var j = 0; j < i; j++) {
            ret.push(<div style={{ width: '14%', top: '-50%', margin: '0 1%', position: "relative", display: 'inline-block', zIndex: '0', height: '5vh', backgroundColor: 'grey', borderRadius: '100%' }}> </div>)
        }

        return ret
    }
    /// return new Array(this.state.currentNumber).map(i => <div style={{width:'50px', zIndex:'30', height: '50px', backgroundColor: 'grey', borderRadius: '100%'}}> </div>)



    render() {

        let xStyle = {
            color: '#9ACDE7',
            cursor: 'pointer',
            background: "#1B2B38",
            border: '1px outset #888',
            padding: '1%',
            margin: '1%',
            borderRadius: '6px',
            display: 'inline-block',
            top: 0
        }


        return <div style={{ position: 'relative', 
        background: "linear-gradient(to right bottom, white, #559FA8)", 
        height: '20vw', width: '30vw' }}>
            <div>
                <div style={xStyle} onClick={this.increaseBalls}>Add</div>
                <div style={xStyle} onClick={this.decreaseBalls}>Remove</div> 
                
                <div style={xStyle}>Displaced: {this.state.waterArr[this.state.currentNumber]}L</div>
                
            </div>
            
            
            <div id="boat" style={{
                zIndex: '50',
                position: 'absolute',
                margin: '0 10%',
                backgroundImage: "url('/images/boat.png')",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                width: '80%', height: '50%',
                bottom: this.boatHeight()
            }}>
            </div>

            <div style={{
                zIndex: '0', position: 'absolute', bottom: this.ballHeight(),
                margin: '0 12%', width: '76%'
            }} >{this.printBalls().map(i => i)}</div>

            

            <div id="water" style={{
                zIndex: '100', position: 'absolute',
                backgroundImage: "url('/images/waterbg-01.png')",
                backgroundSize: '100% 100%', width: '100%', height: this.waterHeight(), bottom: '0'
            }} ></div>
        </div>
    }
}

Boat.contextType = LabContext
export default Boat