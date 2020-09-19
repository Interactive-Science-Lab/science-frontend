import React from "react"

class Boat extends React.Component {
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
        return `${60 - this.state.currentNumber * 3}%`
    }

    waterHeight = () => {
        return `${42 + this.state.currentNumber * 1.5}%`
    }

    increaseBalls = () => {
        if (this.state.currentNumber < 6) {
            this.setState({ currentNumber: this.state.currentNumber + 1 })
        }
    }

    decreaseBalls = () => {
        if (this.state.currentNumber > 0) {
            this.setState({ currentNumber: this.state.currentNumber - 1 })
        }
    }

    printBalls = () => {
        let i = this.state.currentNumber
        let ret = []

        for (var j = 0; j < i; j++) {
            ret.push(<div style={{ width: '56px', margin: '-15px 3px 0', position: "relative", display: 'inline-block', zIndex: '0', height: '60px', backgroundColor: 'grey', borderRadius: '100%' }}> </div>)
        }

        return ret
    }
    /// return new Array(this.state.currentNumber).map(i => <div style={{width:'50px', zIndex:'30', height: '50px', backgroundColor: 'grey', borderRadius: '100%'}}> </div>)



    render() {

        let xStyle = {
            fontSize: '16px',
            color: '#9ACDE7',
            cursor: 'pointer',
            background: "#1B2B38",
            border: '1px outset #888',
            padding: '10px 1%',
            margin: '10px 2%',
            borderRadius: '6px',
            display: 'inline-block',
            width:'29%'
        }


        return <div style={{ position: 'relative', background: "linear-gradient(to right bottom, white, #559FA8)", height: '300px', width: '500px' }}>
            <div>
                <div style={xStyle} onClick={this.increaseBalls}>Increase (+)</div>
                
                <div style={xStyle}>Displaced Water<br/> {this.state.waterArr[this.state.currentNumber]}L</div>
                
                <div style={xStyle} onClick={this.decreaseBalls}>Decrease (-)</div> </div>
            
            
            <div id="boat" style={{
                zIndex: '50',
                position: 'absolute',
                margin: '0 50px',
                backgroundImage: "url('/images/boat.png')",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                width: '400px', height: '130px',
                bottom: this.boatHeight()
            }}>
            </div>

            <div style={{
                zIndex: '0', position: 'absolute', bottom: this.ballHeight(),
                margin: '0 50px',
            }} >{this.printBalls().map(i => i)}</div>

            

            <div id="water" style={{
                zIndex: '100', position: 'absolute',
                backgroundImage: "url('/images/waterbg-01.png')",
                backgroundSize: '100% 100%', width: '100%', height: this.waterHeight(), bottom: '0'
            }} ></div>
        </div>
    }
}

export default Boat