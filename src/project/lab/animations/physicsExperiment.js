import React from 'react'
import PendulumTest from './pendulum'
import BoatTest from './boat'
import ElectricTest from './electric'
import Popup from './popup'
import AnimationControls from './animationControls'
import experimentInfo from './experimentInfo'



class PhysicsExperiment extends React.Component {
   
    animation = () => {
        let comp = ""
        switch (this.props.animationKind) {
            case "experiment_1":
                comp = <AnimationControls info={experimentInfo.car} />
                break;
            case "experiment_2":
                comp = <AnimationControls info={experimentInfo.balloon} />
                break;
            case "experiment_3":
                comp = <PendulumTest />
                break;
            case "experiment_4":
                comp = <BoatTest />
                break;
            case "experiment_5":
                comp = <AnimationControls info={experimentInfo.momentum} />
                break;
            case "experiment_6":
                comp = <AnimationControls info={experimentInfo.stairs} />
                break;
            case "experiment_7":
                comp = <AnimationControls info={experimentInfo.viscosity} />
                break;
            case "experiment_8":
                comp = <AnimationControls info={experimentInfo.cart} />
                break;
            case "experiment_9":
                comp = <AnimationControls info={experimentInfo.metalBall} />
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



export default PhysicsExperiment