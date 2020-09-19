import React from "react"

class Pendulum extends React.Component {
    constructor(props) {
        super(props)

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();



        this.state = {
            height: 300,
            width: 500,
            frameRate: 1 / 40,
            frameDelay: 1000 / 40,
            lastTime: new Date(),
            chosenLength: 25,
            pendulum: {},
            canvas: false,
            ctx: false
        }
    }

    componentDidMount = () => {

        let canvas = document.getElementById("canvas")
        let ctx = canvas.getContext("2d")

        ctx.strokeStyle = "black";
        ctx.fillStyle = "gold";

        let pendulum = {
            mass: 200,
            length: this.state.chosenLength,
            theta: (Math.PI / 2) - 0.5,
            omega: 0,
            alpha: 0,
            J: 100 * this.state.chosenLength * this.state.chosenLength / 500
        }

        this.setState({ canvas, ctx, pendulum })

        window.requestAnimFrame(this.loop);

    }

    changeLength = (e) => {
        let chosenLength = Number.parseInt(e.target.getAttribute('data-choice'))

        let pendulum = {
            mass: 200,
            length: chosenLength,
            theta: (Math.PI / 2) - 0.5,
            omega: 0,
            alpha: 0,
            J: 100 * chosenLength * chosenLength / 500
        }

        this.setState({ pendulum, chosenLength })
    }


    loop = () => {
        let { pendulum, ctx, lastTime, width, height } = this.state

        var timeMs = (new Date()).getTime();
        var deltaT = (timeMs - lastTime.getTime()) / 1000;

        /* 
        When switching away from the window, 
        requestAnimationFrame is paused. Switching back
        will give us a giant deltaT and cause an explosion.
        We make sure that the biggest possible deltaT is 50 ms
        */

        if (deltaT > 0.050) {
            deltaT = 0.050;
        }
        deltaT = 0.01;

        let time = new Date(timeMs);

        /* Velocity Verlet */
        /* Calculate current position from last frame's position, velocity, and acceleration */
        pendulum.theta += pendulum.omega * deltaT + (0.5 * pendulum.alpha * deltaT * deltaT);

        /* Calculate forces from current position. */
        var T = pendulum.mass * 9.81 * Math.cos(pendulum.theta) * pendulum.length;

        /* Current acceleration */
        var alpha = T / pendulum.J;

        /* Calculate current velocity from last frame's velocity and 
            average of last frame's acceleration with this frame's acceleration. */
        pendulum.omega += 0.5 * (alpha + pendulum.alpha) * deltaT;

        /* Update acceleration */
        pendulum.alpha = alpha;

        var px = width / 2 + pendulum.length * Math.cos(pendulum.theta);
        var py = 50 + pendulum.length * Math.sin(pendulum.theta);


        // Start drawing
        ctx.clearRect(0, 0, width, height);

        // Draw bar for Pendulum
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(width / 2, 50);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = 'beige';

        // Draw pendulum
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

        lastTime = new Date();
        window.requestAnimFrame(this.loop);

    }


    render() {
        let canvasStyle = { display: 'block', margin: '0px auto', height: '300px', width: '500px', border: "none" }
        
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


        return <div>
            <canvas style={canvasStyle} id="canvas" height="300" width="500"></canvas>
            <br />
            <div style={{ backgroundColor: '#69C', borderRadius: '20px', border: '2px outset #333', margin: '10px 0' }}>
                <b>Change Length</b><br />
            <span style={{...xStyle, fontWeight: this.state.chosenLength === 25 ? "bold" : "" }} onClick={this.changeLength} data-choice={25}> 25cm </span>
                <span  style={{...xStyle, fontWeight: this.state.chosenLength === 50 ? "bold" : "" }} onClick={this.changeLength} data-choice={50}> 50cm </span>
                <span  style={{ ...xStyle,fontWeight: this.state.chosenLength === 100 ? "bold" : "" }} onClick={this.changeLength} data-choice={100}> 100cm </span>
                <span  style={{...xStyle, fontWeight: this.state.chosenLength === 200 ? "bold" : "" }} onClick={this.changeLength} data-choice={200}> 200cm </span>
            </div>
        </div>
    }
}


export default Pendulum