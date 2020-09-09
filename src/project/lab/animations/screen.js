import React from 'react'

import { FRAMERATE, FRAMERATIO } from './experimentInfo'

class Screen extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...this.handleProps(props)
    
    }
    }

    handleProps = (props) => {
        return { ...props, frameCount: 0, play: false, end: false, resetData: JSON.stringify(props),
            endSound:  (props.endSound ? new soundEffect(props.endSound) : null),
            startSound:  (props.startSound ? new soundEffect(props.startSound) : null)  }
    }

    setProps = (props) => {
        this.setState({ ...this.handleProps(props) })
    }

    componentWillReceiveProps = (props) => {
        let update = true

        let p = this.state.play

        Object.entries(props).map((pair) => {
            if (Array.isArray(pair[1])) {
                if (!arraysMatch(pair[1], this.state[pair[0]])) {
                    update = false;
                    console.log(pair[1], pair[0], this.state[pair[0]], "FAIL")
                }
            } else {
                if (this.state[pair[0]] !== pair[1]) {
                    update = false;
                    console.log(pair[1], pair[0], this.state[pair[0]], "FAIL")
                }
            }
        })

        if (!p) {
            if (!update) {
                this.setProps(props)
            }
        }
    }
    componentDidMount = async () => { this.animate() }
    componentDidUpdate = async () => { this.animate() }

    toggleAnimation = () => {
        let newPlay = !this.state.play
        this.setState({ play: newPlay },)
        if(newPlay && this.state.startSound) { this.state.startSound.play() }
       // this.props.hideCallback(!newPlay)
    }

    restartAnimation = () => {
        let props = JSON.parse(this.state.resetData)
        props.ttotal = 0
        this.props.hideCallback()
        this.setProps(props)
    }

    animate = () => {
        if (this.state.play) {
            let { dimensions, position, objectSize, frameCount, maxTime, resetData, stop } = this.state
            frameCount += 1
            if (position[0] + objectSize[0] < (this.state.stop ? this.state.stop[0] : dimensions[0]) &&
                position[1] + objectSize[1] < (this.state.stop ? this.state.stop[1] : dimensions[1]) &&
                frameCount * FRAMERATIO < maxTime) {
                let speed = this.applyAcceleration()
                position = this.moveSprite()
                setTimeout(() => { this.setState({ position, speed, frameCount }) }, FRAMERATE);
            } else {
                if(this.state.endSound) { this.state.endSound.play() }
                if (frameCount * FRAMERATIO > maxTime) {
                    let dleft = stop[1] - position[1]
                    let tleft = dleft / this.state.speed[1]
                    let tcounted = frameCount * FRAMERATIO
                    let ttotal = tleft + tcounted
                    this.setState({ ttotal })
                }
                this.setState({ play: false, end: true })
            }
        }
    }

    applyAcceleration = () => {
        let { speed, acceleration, maxSpd } = this.state
        speed[0] += acceleration[0] * FRAMERATIO
        speed[1] += acceleration[1] * FRAMERATIO
        if (speed[0] > maxSpd) { speed[0] = maxSpd }
        if (speed[1] > maxSpd) { speed[1] = maxSpd }
        return speed
    }

    moveSprite = () => {
        let { speed, position, stop, dimensions } = this.state
        position[0] += speed[0] * FRAMERATIO
        position[1] += speed[1] * FRAMERATIO
        let end = stop || dimensions
        if (position[0] > end[0]) {
            position[0] = end[0]
        }
        if (position[1] > end[1]) {
            position[1] = end[1]
        }
        return position
    }

    spriteCoordinates = () => {
        let p = this.state.position
        let d = this.state.dimensions
        return { top: `${Math.round((p[1] / d[1]) * 100)}%`, left: `${Math.round((p[0] / d[0]) * 100)}%` }
    }

    render() {
        let width = this.state.objectSize[0] * 100 / this.state.dimensions[0]
        let height = this.state.objectSize[1] * 100 / this.state.dimensions[1]



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

        console.log(this.state)

        return <div style={{ width: 'min-content', background: 'linear-gradient(#c9dce5 0%, #9ACDE7 10%, #9ACDE7 90%, #5e8da5 100%)', borderRadius: '4px', border: '2px outset #333', padding: '20px' }} >
            <div style={{
                width: '480px',
                height: '320px',
                backgroundImage: `url(${`/images/${this.state.background || ''}`})`,
                backgroundSize: 'cover',
                position: 'relative',
                overflow: 'hidden',
                border: '2px inset #444',
                borderRadius: '4px'
            }} >


                <div style={{
                    position: 'absolute',
                    ...this.spriteCoordinates(),
                    width: `${width}%`,
                    height: `${height}%`,



                    backgroundImage: (this.state.end && this.state.altEndSprite) ?
                        "" : `url(${`/images/${this.state.sprite || 'marble-purple.png'}`})`,
                    backgroundSize: this.state.specialSprite === 'stretch' ? '100% 100%' : 'contain',
                    backgroundRepeat: 'no-repeat'

                }} >








                    {this.state.end && this.state.altEndSprite ?
                        <span style={{
                            display: 'block',
                            marginTop: (width < .5 || height < .5) ? '-8px' : '-50%',
                            marginLeft: (width < .5 || height < .5) ? '-8px' : '0%',
                            opacity: '1',
                            backgroundImage: `url(${`/images/${this.state.altEndSprite || ''}?a={${Math.random()}`})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            width: (width < .5 || height < .5) ? '16px' : `200%`,
                            height: (width < .5 || height < .5) ? '16px' : `200%`
                        }}
                        ></span> :

                        (this.state.end && this.state.endSprite ?
                            <span style={{
                                display: 'block',
                                marginTop: (width < .5 || height < .5) ? '-8px' : '-100%',
                                marginLeft: (width < .5 || height < .5) ? '-8px' : '-100%',
                                opacity: '1',
                                backgroundImage: `url(${`/images/${this.state.endSprite || ''}?a={${Math.random()}`})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                width: (width < .5 || height < .5) ? '16px' : `400%`,
                                height: (width < .5 || height < .5) ? '16px' : `400%`
                            }}
                            ></span> :

                            ((width < 2 || height < 2) ? <span style={{ display: 'block', marginTop: '-8px', color: 'red', opacity: '.7' }}>o</span> : "")

                        )}

                </div>








            </div>

            <div>

                {this.state.ttotal && this.state.ttotal !== 0 ? <div>This might take a while. The total time would be {Math.round(this.state.ttotal * 100) / 100} seconds.</div> : ""}

                {this.props.displays.map(d => {
                    if (d[0] !== 'Time') {
                        return <div style={{ display: 'inline-block', textAlign: 'center', width: '125px', padding: '10px' }}>{d[0]}
                            <div style={{ borderRadius: '8px', fontFamily: 'courier new', backgroundColor: 'rgba(255,255,255,.5)', display: 'inline-block', textAlign: 'center', width: '100px', padding: '10px' }}>
                                {d[1](this.state)}
                            </div>
                        </div>
                    } else {
                        return <div style={{ display: 'inline-block', textAlign: 'center', width: '125px', padding: '10px' }}>Time
                            <div style={{ borderRadius: '8px', fontFamily: 'courier new', backgroundColor: 'rgba(255,255,255,.5)', display: 'inline-block', textAlign: 'center', width: '100px', padding: '10px' }}>
                                {Math.round(this.state.frameCount * FRAMERATIO * 100) / 100}s
                            </div>
                        </div>
                    }

                })
                }
            </div>

            {this.state.end ? "" : <span style={xStyle} onClick={this.toggleAnimation}>{this.state.play ? <span class="fas fa-pause" style={{ color: 'white' }}> Pause</span> : <span style={{ color: 'white' }} class="fas fa-play"> Play</span>}</span>}
            {!this.state.play && this.state.frameCount !== 0 ? <span style={xStyle} onClick={this.restartAnimation}><span style={{ color: 'white' }} class="fas fa-undo"> Restart</span></span> : ""}

        </div>

    }
}

export default Screen





var arraysMatch = function (arr1, arr2) {

    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    // Otherwise, return true
    return true;

};



function soundEffect(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = .1
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
