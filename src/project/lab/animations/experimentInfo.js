let car = {
    data: {
        sprite: "car",
        buttonText: "Go",
        stepSound: "/sounds/carrun.wav",
        dimensions: [100, 50],
        objectSize: [5, 2],
        position: [0, 25],
        speed: [2, 0],
        acceleration: [3, 0],
        maxTime: 100,
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
                    , sprite: "car-speed-1.png", background: "car-track-1.png",
                    startSound: "/sounds/car slow.wav", } },
                {
                    name: "Fast", settings: {
                        maxSpd: 27,
                        dimensions: [300, 150],
                        acceleration: [6, 0],
                        position: [0, 75], sprite: "car-speed-3.png", background: "car-track-3.png",
                        startSound: "/sounds/car fast.wav"
                    }
                },
                {
                    name: "Very Fast", settings: {
                        maxSpd: 100, acceleration: [16, 0],
                        dimensions: [1000, 500],
                        position: [0, 250], sprite: "car-speed-5.png", background: "car-track-5.png",
                        startSound: "/sounds/car vfast.wav"
                    }
                },
            ]
        }
    ]

}

let balloon = {
    data: {
        sprite: "metalball-obj.png",
        endSprite: "small-explosion.gif",
        startSound: "/sounds/dropwater.wav",
        endSound: "/sounds/explosion.wav",
        buttonText: "Drop Ball",
        dimensions: [50, 100],
        position: [25, 0],
        objectSize: [1, 1],
        speed: [0, 0],
        acceleration: [0, 9.8],
        maxTime: 100,
        maxSpd: 1000,
    },
    displays: [
        //['Height', (item) => { return `${Math.round(item.dimensions[1] - item.position[1])}m` }],
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
        altEndSprite2: "small-explosion.gif",
        background: "inside-track.png",
        startSound: "/sounds/startgo.wav",
        endSound: "/sounds/explosion.wav",
        dimensions: [25, 18],
        position: [-2, 12],
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
                        objectSize: [4, 4],
                        speed: [8, 0],
                        position: [-2, 10],
                        mass: '11.2',
                        sprite: "bike-moment.png"
                    }
                },
                {
                    name: "Truck", settings: {
                        objectSize: [5, 3],
                        speed: [19, 0],
                        position: [-3, 11],
                        mass: '2742.6',
                        sprite: "truck-moment.png"
                    }
                },

                {
                    name: "Baseball", settings: {
                        objectSize: [.1, .1],
                        speed: [35, 0],
                        position: [1.9, 11],
                        mass: '.1'
                    }
                },

                {
                    name: "Train", settings: {
                        objectSize: [16, 5],
                        speed: [13, 0],
                        position: [-14, 9],
                        mass: '24942.9',
                        sprite: "train-moment.png"
                    }
                },
                {
                    name: "Bowling Ball", settings: {
                        objectSize: [.3, .3],
                        speed: [7.5, 0],
                        position: [1.7, 11],
                        mass: '4.6'
                    }
                },
                {
                    name: "Compact Car", settings: {
                        objectSize: [4, 1.75],
                        speed: [18, 0],
                        
                        mass: '465.4',
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
        startSound: "/sounds/whistle.wav",
        stepSound: "/sounds/footstep.wav",
        buttonText: "Blow Whistle To Start",
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
        ['Stair Height', (item) => { return `3.9m` }],
        ['Weight (Mass)', (item) => { return `${Math.round(item.objectSize[1] * item.objectSize[0] * 100)}kg` }],
        ['Time', (item) => { return null }]
    ],
    options: [
        {
            optionName: "Person",
            optionSelections: [
                {
                    name: "John", settings: {
                        objectSize: [.42, 1.63],
                        position: [.85, 4.2],
                        sprite: "person-1.png",
                        speed: [1, -1]
                    },
                }, {
                    name: "Mary", settings: {
                        objectSize: [.29, 1.62],
                        sprite: "person-2.png",
                        speed: [1.6, -1.6],
                        position: [.9, 4.2],
                    },
                }, {
                    name: "Christian", settings: {
                        objectSize: [.58, 1.69],
                        sprite: "person-3.png",
                        speed: [.8, -.8],
                        position: [.8, 4.2],
                    },
                }, {
                    name: "Mike", settings: {
                        objectSize: [.46, 1.82],
                        sprite: "person-4.png",
                        speed: [1.3, -1.3],
                        position: [.85, 4],
                    },
                }, {
                    name: "Sarah", settings: {
                        objectSize: [.4, 1.68],
                        sprite: "person-5.png",
                        speed: [1.3, -1.3],
                        position: [.85, 4.2],
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
        buttonText: "Drop",
        dimensions: [90, 60],
        position: [45, 26.1],
        objectSize: [3, 3],
        speed: [0, 0],
        acceleration: [0, 9800],
        maxTime: 30,
        maxSpd: 9800,
        stop: [100, 58.88]
    },
    displays: [
        ['Distance', (item) => { return `${Math.round( (item.dimensions[1] - item.position[1] - 3.8) *100) / 100}cm` }],
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
                { name: "Cool (5'C)", settings: {} },
                { name: "Room Temp (21'C)", settings: {}, effects: { acceleration: 2, maxSpd: 2 } },
                { name: "Warm (50'C)", settings: {}, effects: { acceleration: 5, maxSpd: 5 } },
            ]
        }
    ]
}

let cart = {
        data: {
            sprite: "cart-obj.png",
            background: "inside-track.png",
            startSound: '/sounds/cartloud.wav',
            buttonText: "Push Cart",
            dimensions: [12, 8],
            position: [1, 4],
            objectSize: [2, 2],
            speed: [0, 0],
            acceleration: [3, 0],
            maxTime: 100,
            maxSpd: 100,
        },
        displays: [
            ['Distance', (item) => { return `${Math.round(item.position[0] - 1)}m` }],
            //['Speed', (item) => { return `${Math.round(item.speed[0])}m/s` }],
            ['Time', (item) => { return null }]
        ],
        options: [
            {
                optionName: "Push Force",
                optionSelections: [
                    {
                        name: "20N", settings: {
                            acceleration: [.75, 0],
                        }
                    },
                    {
                        name: "35N", settings: {
                            acceleration: [1.25, 0],
                        }
                    },
                    {
                        name: "50N", settings: {
                            acceleration: [2, 0],
                        }
                    }
                ]
            },
            {
                optionName: "Cart Mass",
                optionSelections: [
                    {
                        name: "2kg", settings: { sprite: "cart-obj.png"
                        }, effects: { acceleration: 1 }
                    },
                    {
                        name: "7kg", settings: { sprite: "cart-2.png"
                        }, effects: { acceleration: .85 }
                    },
                    {
                        name: "18kg", settings: { sprite: "cart-4.png"
                        }, effects: { acceleration: .5 }
                    },
                    {
                        name: "31kg", settings: { sprite: "cart-6.png"
                        }, effects: { acceleration: .3 }
                    },
                    {
                        name: "47kg", settings: { sprite: "cart-8.png"
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
        buttonText: "Go",
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
                        altEndSprite: "wall-crack.png",
                        endSound: "/sounds/drop.wav",
                    }
                },
                {
                    name: "Sm Wrecking Ball", settings: {
                        acceleration: [20, 0],
                        objectSize: [.5, .5],
                        altEndSprite: "wall-crack.png",
                        endSound: "/sounds/drop.wav",
                    }
                },
                {
                    name: "Lg Wrecking Ball", settings: {
                        acceleration: [16, 0],
                        objectSize: [1, 1],
                        altEndSprite: "wll-crack.gif",
                        endSound: "/sounds/brick-crumble.wav",
                    }
                },
            ]
        }
    ]
}

export default {car, balloon, momentum, stairs, viscosity, cart, metalBall}

//How many milliseconds between frames
export const FRAMERATE = 42
//Multiply this by per-second values to get per-frame values m/s * FRAMERATIO = m/f
export const FRAMERATIO = FRAMERATE / 1000