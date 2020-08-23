import React from 'react'
import PendulumTest from './pendulum'
import BoatTest from './boat'
import ElectricTest from './electric'
import Popup from './popup'

//How many milliseconds between frames
const FRAMERATE = 42
//Multiply this by per-second values to get per-frame values     m/s * FRAMERATIO = m/f
const FRAMERATIO = FRAMERATE / 1000


class PhysicsExperiment extends React.Component {
    constructor(props) {
        super(props)
    }

    animation = () => {
        let comp = ""
        switch (this.props.animationKind) {
            case "experiment_1":
                comp = <Animation info={car} />
                break;
            case "experiment_2":
                comp = <Animation info={balloon} />
                break;
            case "experiment_3":
                comp = <PendulumTest />
                break;
            case "experiment_4":
                comp = <BoatTest />
                break;
            case "experiment_5":
                comp = <Animation info={momentum} />
                break;
            case "experiment_6":
                comp = <Animation info={stairs} />
                break;
            case "experiment_7":
                comp = <Animation info={viscosity} />
                break;
            case "experiment_8":
                comp = <Animation info={cart} />
                break;
            case "experiment_9":
                comp = <Animation info={metalBall} />
                break;
            case "experiment_10":
                comp = <ElectricTest />
                break;
        }

        return comp
    }

    render() {
        return <Popup> {this.animation()} </Popup>
    }

}

class Animation extends React.Component {
    constructor(props) {
        super(props)
        let selections = {}
        props.info.options.map(option => selections[option.optionName] = option.optionSelections[0].name)
        this.state = {
            info: props.info,
            selections: selections,
            showOptions: true
        }
    }

    showOptions = (value = true) => { this.setState({ showOptions: value }) }

    combineOptions = () => {
        let ret = this.state.info.data
        let effects = []

        this.state.info.options.map(option => {
            let settings = {}
            let selectionName = this.state.selections[option.optionName]
            option.optionSelections.map(os => os.name === selectionName ?
                settings = os
                : null)

            if (settings.effects) { effects.push(settings.effects) }
            ret = { ...ret, ...settings.settings }

        })

        ret = JSON.parse(JSON.stringify(ret))

        effects.map(e => {
            Object.entries(e).map(effectSetting => {

                if (Array.isArray(ret[effectSetting[0]])) {
                    ret[effectSetting[0]][0] = effectSetting[1] * ret[effectSetting[0]][0]
                    ret[effectSetting[0]][1] = effectSetting[1] * ret[effectSetting[0]][1]
                } else {
                    ret[effectSetting[0]] = effectSetting[1] * ret[effectSetting[0]]
                }

            }
            )

        })

        return ret

    }

    setOption = (e) => {
        let option = e.target.getAttribute('data-option')
        let select = e.target.getAttribute('data-select')
        this.setState({ selections: { ...this.state.selections, [option]: select } })

    }


    render() {


        let xStyle = {
            fontSize: '16px',
            color: '#9ACDE7',
            cursor: 'pointer',
            background: "#1B2B38",
            border: '1px outset #888',
            padding: '6px',
            margin: '4px',
            borderRadius: '6px',
            display: 'inline-block'
        }


        return <div style={{ width: 'min-content' }}  >
            <Screen {...this.combineOptions()} hideCallback={this.showOptions} displays={this.props.info.displays} />

            {this.state.showOptions ? <div>{

                this.state.info.options.map(option => <div style={{ background: 'linear-gradient(#9ACDE7, #9ACDE7, #5e8da5)', borderRadius: '6px', border: '2px outset #333', margin: '10px 0' }}>
                    <div><b>{option.optionName}</b></div> {option.optionSelections.map(selection =>
                        <span style={xStyle} onClick={this.setOption} data-option={option.optionName} data-select={selection.name}>
                            {this.state.selections[option.optionName] === selection.name ? <b><u style={{color:'white'}}>{selection.name}</u></b> : selection.name}
                        </span>
                    )}
                </div>)

            }</div> : ""}
        </div>
    }
}

class Screen extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...this.handleProps(props) }
    }

    handleProps = (props) => {
        return { ...props, frameCount: 0, play: false, end: false, resetData: JSON.stringify(props) }
    }

    setProps = (props) => {
        this.setState({ ...this.handleProps(props) })
    }

    componentWillReceiveProps = (props) => {
        let update = true
        Object.entries(props).map((pair) => {
            if (Array.isArray(pair[1])) {
                if (!arraysMatch(pair[1], this.state[pair[0]])) { update = false; console.log(pair[1], pair[0], this.state[pair[0]], "FAIL") }
            } else {
                if (this.state[pair[0]] !== pair[1]) { update = false; console.log(pair[1], pair[0], this.state[pair[0]], "FAIL") }
            }
        })
        if (!update) {
            this.setProps(props)
        }
    }
    componentDidMount = async () => { this.animate() }
    componentDidUpdate = async () => { this.animate() }

    toggleAnimation = () => {
        let newPlay = !this.state.play
        this.setState({ play: newPlay })
        this.props.hideCallback(!newPlay)
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
                if(frameCount * FRAMERATIO > maxTime) {
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
        if(position[0] > end[0]) {
            position[0] = end[0]
        } 
        if(position[1] > end[1]) {
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
                backgroundImage: `url(${`/images/${ this.state.background || ''  }`})`,
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
                    "" :  `url(${`/images/${ this.state.sprite || 'marble-purple.png'  }`})`,
                    backgroundSize: this.state.specialSprite === 'stretch' ? '100% 100%' : 'contain',
                    backgroundRepeat: 'no-repeat'
                    
                    }} >
                        
                        
                        
                        
                        
                        
                        
                        
                        { this.state.end && this.state.altEndSprite ?
                            <span style={{
                                display:'block',
                                marginTop: (width < .5 || height < .5) ? '-8px' : '-50%',
                                marginLeft: (width < .5 || height < .5) ? '-8px' : '0%',
                                opacity:'1',
                                backgroundImage: `url(${`/images/${ this.state.altEndSprite || ''  }?a={${Math.random()}`})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                width: (width < .5 || height < .5) ? '16px' : `200%`, 
                                height: (width < .5 || height < .5) ? '16px' : `200%`}}
                                ></span> : 

                                (  this.state.end && this.state.endSprite ?
                            <span style={{
                                display:'block',
                                marginTop: (width < .5 || height < .5) ? '-8px' : '-100%',
                                marginLeft: (width < .5 || height < .5) ? '-8px' : '-100%',
                                opacity:'1',
                                backgroundImage: `url(${`/images/${ this.state.endSprite || ''  }?a={${Math.random()}`})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                width: (width < .5 || height < .5) ? '16px' : `400%`, 
                                height: (width < .5 || height < .5) ? '16px' : `400%`}}
                                ></span> : 

                                ((width < 2 || height < 2) ? <span style={{display:'block',marginTop:'-8px',color:'red',opacity:'.7'}}>o</span> : "")    
                                
                                 ) }
                          
                </div>

                






            </div>

            <div>

                { this.state.ttotal && this.state.ttotal !== 0 ? <div>This might take a while. The total time would be {Math.round( this.state.ttotal * 100) / 100} seconds.</div> : ""}

                {this.props.displays.map(d => {
                    if (d[0] !== 'Time') {
                        return <div style={{ display:'inline-block', textAlign: 'center', width: '125px', padding: '10px'}}>{d[0]}
                            <div style={{borderRadius: '8px', fontFamily: 'courier new', backgroundColor: 'rgba(255,255,255,.5)', display:'inline-block', textAlign: 'center', width: '100px', padding: '10px'}}>
                                {d[1](this.state)}
                            </div>
                        </div>
                    } else {
                        return  <div style={{display:'inline-block', textAlign: 'center', width: '125px', padding: '10px'}}>Time
                            <div style={{borderRadius: '8px',fontFamily: 'courier new', backgroundColor: 'rgba(255,255,255,.5)', display:'inline-block', textAlign: 'center', width: '100px', padding: '10px'}}>
                                {Math.round(this.state.frameCount * FRAMERATIO * 100) / 100}s
                            </div>
                        </div>
                    }

                })
                }
                </div>

            {this.state.end ? "" : <span style={xStyle} onClick={this.toggleAnimation}>{this.state.play ? <span class="fas fa-pause" style={{color:'white'}}> Pause</span> : <span style={{color:'white'}} class="fas fa-play"> Play</span>}</span>}
            {!this.state.play && this.state.frameCount !== 0 ? <span style={xStyle} onClick={this.restartAnimation}><span  style={{color:'white'}} class="fas fa-undo"> Restart</span></span> : ""}

        </div>

    }
}


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



export default PhysicsExperiment

let car = {
    data: {
        sprite: "car",
        dimensions: [100, 50],
        objectSize: [5, 2],
        position: [0, 25],
        speed: [2, 0],
        acceleration: [3, 0],
        maxTime: 10,
        maxSpd: 100,
    },
    displays: [
        ['Distance', (item) => { return `${Math.round(item.position[0])}m` }],
        ['Speed', (item) => { return `${Math.round(item.speed[0])}m/s` }],
        ['Time', (item) => { return null }]
    ],
    options: [
        {
            optionName: "Speed",
            optionSelections: [
                { name: "Slow", settings: { maxSpd: 10, acceleration: [2, 0]
                    , sprite: "car-speed-1.png", background: "car-track-1.png" } },
                {
                    name: "Fast", settings: {
                        maxSpd: 27,
                        dimensions: [300, 150],
                        acceleration: [6, 0],
                        position: [0, 75], sprite: "car-speed-3.png", background: "car-track-3.png"
                    }
                },
                {
                    name: "Very Fast", settings: {
                        maxSpd: 100, acceleration: [16, 0],
                        dimensions: [1000, 500],
                        position: [0, 250], sprite: "car-speed-5.png", background: "car-track-5.png"
                    }
                },
            ]
        }
    ]

}

let balloon = {
    data: {
        sprite: "balloon.png",
        endSprite: "small-explosion.gif",
        dimensions: [50, 100],
        position: [25, 0],
        objectSize: [1, 1],
        speed: [0, 0],
        acceleration: [0, 9.8],
        maxTime: 100,
        maxSpd: 100,
    },
    displays: [
        ['Height', (item) => { return `${Math.round(item.dimensions[1] - item.position[1])}m` }],
        ['Speed', (item) => { return `${Math.round(item.speed[1])}m/s` }],
        ['Time', (item) => { return null }]
    ],
    options: [
        {
            optionName: "Drop Height",
            optionSelections: [
                {
                    name: "V Lo", settings: {
                        dimensions: [40, 19],
                        position: [25, 0],
                        background: "ballon-background-1.png"
                    }
                },
                {
                    name: "Lo", settings: {
                        dimensions: [150, 78],
                        position: [75, 0],
                        background: "ballon-background-2.png"
                    }
                },

                {
                    name: "Med", settings: {
                        dimensions: [400, 200],
                        position: [115, 5],
                        background: "ballon-background-3.png"
                    }
                },

                {
                    name: "High", settings: {
                        dimensions: [1000, 500],
                        position: [344, 10],
                        background: "ballon-background-4.png"
                    }
                },
                {
                    name: "VHigh", settings: {
                        dimensions: [8000, 4000],
                        position: [2980, 50],
                        background: "ballon-background-5.png"
                    }
                },
            ]
        }
    ]
}


let momentum = {
    //5 objects 
    data: {
        sprite: "metalball-obj.png",
        background: "inside-track.png",
        dimensions: [25, 18],
        position: [0, 12],
        objectSize: [1, 1],
        speed: [0, 0],
        acceleration: [0, 0],
        maxTime: 100,
        maxSpd: 100,
        specialSprite: 'stretch',
    },
    displays: [
        ['Distance', (item) => { return `${Math.round(item.position[0] + item.objectSize[0] - 2)}m` }],
        ['Mass', (item) => { return `${item.mass}kg` }],
        ['Time', (item) => { return null }]
    ],
    options: [
        {
            optionName: "Object",
            optionSelections: [
                {
                    name: "Bike", settings: {
                        objectSize: [2, 1.5],
                        speed: [7.5, 0],
                        position: [0, 12],
                        mass: '50',
                        sprite: "bike-moment.png"
                    }
                },
                {
                    name: "Truck", settings: {
                        objectSize: [5, 3],
                        speed: [20, 0],
                        position: [-3, 11],
                        mass: '500',
                        sprite: "truck-moment.png"
                    }
                },

                {
                    name: "Baseball", settings: {
                        objectSize: [.1, .1],
                        speed: [45, 0],
                        position: [1.9, 11],
                        mass: '.3'
                    }
                },

                {
                    name: "Train", settings: {
                        objectSize: [16, 5],
                        speed: [12, 0],
                        position: [-14, 9],
                        mass: '5000',
                        sprite: "train-moment.png"
                    }
                },
                {
                    name: "Bowling Ball", settings: {
                        objectSize: [.3, .3],
                        speed: [8, 0],
                        position: [1.7, 11],
                        mass: '12'
                    }
                },
                {
                    name: "Compact Car", settings: {
                        objectSize: [4, 1.75],
                        speed: [30, 0],
                        mass: '300',
                        sprite: "car-moment.png"
                    }
                },
            ]
        }
    ]
}

let stairs = {
    //5 objects 
    data: {
        sprite: "person-test.png",
        background: "stair-bg.png",
        dimensions: [8, 6],
        position: [.85, 4.1],
        objectSize: [.5, 2],
        speed: [1, -1],
        acceleration: [0, 0],
        maxTime: 100,
        maxSpd: 100,
        specialSprite: 'stretch',
        stop: [6.5, 10]
    },
    displays: [
        ['Height', (item) => { return `${item.objectSize[1]}m` }],
        ['Weight', (item) => { return `${Math.round(item.objectSize[1] * item.objectSize[0] * 100)}kg` }],
        ['Time', (item) => { return null }]
    ],
    options: [
        {
            optionName: "Person",
            optionSelections: [
                {
                    name: "John", settings: {
                        objectSize: [.5, 1.8],
                        sprite: "person-1.png",
                        speed: [1, -1]
                    },
                }, {
                    name: "Mary", settings: {
                        objectSize: [.3, 1.6],
                        sprite: "person-2.png",
                        speed: [1.6, -1.6],
                        position: [.95, 4.3],
                    },
                }, {
                    name: "Christian", settings: {
                        objectSize: [.65, 1.79],
                        sprite: "person-3.png",
                        speed: [.8, -.8],
                        position: [.78, 4.1],
                    },
                }, {
                    name: "Mike", settings: {
                        objectSize: [.5, 1.9],
                        sprite: "person-4.png",
                        speed: [1.3, -1.3],
                        position: [.85, 4.0],
                    },
                }, {
                    name: "Sarah", settings: {
                        objectSize: [.45, 1.86],
                        sprite: "person-5.png",
                        speed: [1.3, -1.3],
                        position: [.87, 4.1],
                    }
                }

            ]
        },
        {
            optionName: "Speed",
            optionSelections: [
                { name: "Walk", settings: {} },
                { name: "Jog", settings: {}, effects: { speed: 1.8 } },
                { name: "Run", settings: {}, effects: { speed: 4.2 } },
            ]
        }
    ]
}

let viscosity = {
    data: {
        sprite: "balloon.png",
        dimensions: [60, 45],
        position: [30, 15],
        objectSize: [3, 3],
        speed: [0, 0],
        acceleration: [0, 9800],
        maxTime: 30,
        maxSpd: 9800,
        stop: [100, 42]
    },
    displays: [
        ['Distance', (item) => { return `${Math.round( (item.dimensions[1] - item.position[1]) *100) / 100}cm` }],
        ['Time', (item) => { return null }]
    ],
    options: [
        {
            optionName: "Liquid",
            optionSelections: [
                {
                    name: "Water", settings: {
                        background: "water-bg.png",
                        acceleration: [0, 8],
                        maxSpd: 8,
                    }
                },
                {
                    name: "Milk", settings: {
                        background: "milk-bg.png",
                        acceleration: [0, 5],
                        maxSpd: 5,
                    }
                },
                {
                    name: "Motor Oil", settings: {
                        background: "oil-bg.png",
                        acceleration: [0, .35],
                        maxSpd: .35,
                    }
                },
                {
                    name: "Honey", settings: {
                        background: "honey-bg.png",
                        acceleration: [0, .003],
                        maxSpd: .003,
                    }
                },


            ]
        },
        {
            optionName: "Temperature",
            optionSelections: [
                { name: "Cool (5degC)", settings: {} },
                { name: "Room Temp (21degC)", settings: {}, effects: { acceleration: 2, maxSpd: 2 } },
                { name: "Warm (50degC)", settings: {}, effects: { acceleration: 5, maxSpd: 5 } },
            ]
        }
    ]
}

let cart = {
        data: {
            sprite: "cart-obj.png",
            background: "inside-track.png",
            dimensions: [12, 8],
            position: [1, 5],
            objectSize: [1, 1],
            speed: [0, 0],
            acceleration: [3, 0],
            maxTime: 100,
            maxSpd: 100,
        },
        displays: [
            ['Distance', (item) => { return `${Math.round(item.position[0] - 1)}m` }],
            ['Speed', (item) => { return `${Math.round(item.speed[0])}m/s` }],
            ['Time', (item) => { return null }]
        ],
        options: [
            {
                optionName: "Push Speed",
                optionSelections: [
                    {
                        name: "Slow", settings: {
                            acceleration: [.75, 0],
                        }
                    },
                    {
                        name: "Mid", settings: {
                            acceleration: [1.25, 0],
                        }
                    },
                    {
                        name: "Fast", settings: {
                            acceleration: [2, 0],
                        }
                    }
                ]
            },
            {
                optionName: "Bags",
                optionSelections: [
                    {
                        name: "0", settings: { sprite: "cart-obj.png"
                        }, effects: { acceleration: 1 }
                    },
                    {
                        name: "2", settings: { sprite: "cart-2.png"
                        }, effects: { acceleration: .85 }
                    },
                    {
                        name: "4", settings: { sprite: "cart-4.png"
                        }, effects: { acceleration: .5 }
                    },
                    {
                        name: "6", settings: { sprite: "cart-6.png"
                        }, effects: { acceleration: .3 }
                    },
                    {
                        name: "8", settings: { sprite: "cart-8.png"
                        }, effects: { acceleration: .2 }
                    }
                ]
            },
        ]
}

let metalBall = {
    data: {
        sprite: "metalball-obj.png",
        background: "wall-bg.png",
        altEndSprite: ".png",
        dimensions: [6, 4.5],
        objectSize: [1, 1],
        position: [0, 2],
        speed: [0, 0],
        acceleration: [1, 0],
        maxTime: 10,
        maxSpd: 256,
        stop: [5.1, 10]
    },
    displays: [
        ['Distance', (item) => { return `${Math.round(item.position[0])}m` }],
        ['Speed', (item) => { return `${Math.round(item.speed[0])}m/s` }],
        ['Time', (item) => { return null }]
    ],
    options: [
        {
            optionName: "Mass",
            optionSelections: [
                {
                    name: "Ping Pong Ball", settings: {
                        acceleration: [56, 0],
                        objectSize: [.04, .04]
                    }
                },
                {
                    name: "Baseball", settings: {
                        acceleration: [36, 0],
                        objectSize: [.1, .1]
                    }
                },
                {
                    name: "Bowling Ball", settings: {
                        acceleration: [26, 0],
                        objectSize: [.25, .25],
                        altEndSprite: "wall-crack.png"
                    }
                },
                {
                    name: "Sm Wrecking Ball", settings: {
                        acceleration: [20, 0],
                        objectSize: [.5, .5],
                        altEndSprite: "wall-crack.png"
                    }
                },
                {
                    name: "Lg Wrecking Ball", settings: {
                        acceleration: [16, 0],
                        objectSize: [1, 1],
                        altEndSprite: "wll-crack.gif"
                    }
                },
            ]
        }
    ]
}
