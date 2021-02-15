import React from 'react'
import { withRouter } from 'react-router-dom'
import { curr_user } from 'helpers/api'

import './labLayout.scss'

import Table from './table/component'
import Cupboard from './cupboard/component'
import Examiner from './examiner/component'

import SoundControls from "./soundControls"

import labSettings from '../../classes/fields'
import { siteOptions } from '../../../site/siteSettings'

class LabLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: "",
            light: false,
            goggles: true,
            coat: true

        }
    }

    componentDidUpdate = async () => {
        if (this.state.message) {
            setTimeout(() => { this.setState({ message: null }) }, 5000);
        }
    }

    clearMessage = () => {
        this.setState({ message: null })
    }

    turnOnLight = () => {
        // if (this.state.light) {
        //     if (this.state.goggles && this.state.coat) {
        //         this.props.soundPlayer.playEffect('light', "loud");
        //         this.setState({ light: !this.state.light })
        //     } else {
        //         this.props.soundPlayer.playEffect('error');
        //         this.setState({ message: "Please replace the coat and goggles before turning off the light." })
        //     }
        // } else if (!this.state.light) {
            this.props.soundPlayer.playEffect('light', "loud");
            this.setState({ light: !this.state.light })
        //}
    }

    toggleGoggles = (e) => {
        e.preventDefault()
        this.props.soundPlayer.playEffect('click');
        this.setState({ goggles: !this.state.goggles })

    }

    toggleCoat = (e) => {
        e.preventDefault()
        this.props.soundPlayer.playEffect('click');
        this.setState({ coat: !this.state.coat })
    }

    adminBar = () => {
        if (curr_user.user_kind === 'admin_user' && !siteOptions.demoSite) {
            return <div className='admin-bar'>
                Select a Class |
                <a href="/lab?l=chemistry">Chemistry</a> |
                <a href="/lab?l=biology">Biology</a> |
                <a href="/lab?l=physics">Physics</a>
            </div>
        }
    }

    render() {
        //The layout of the whole lab screen.
        return (
            <div>
                {this.adminBar()}
                {/* Dynamically set the background depending on the class. */}
                <div className="lab-core-lab-layout" id="labScreen" style={{ backgroundImage: `url('/images/${labSettings[this.props.coreComponent.state.labType].backgroundImage}')` }}>

                    {/* If the light is off, put a full-screen black transparency over everything. */}
                    {!this.state.light ? <div id="lab-layout-light-transparency" /> : ""}

                    {/* Dynamically set the background depending on the class. */}
                    <div id="lab-layout-light-switch" onClick={this.turnOnLight} style={{ backgroundImage: `url('/images/light${this.state.light ? "on" : "off"}.png')` }} />


                    {
                        this.state.message ?
                            <div id="gameMessage"> {this.state.message} <span className="fas fa-times" onClick={this.clearMessage}></span></div> :
                            null
                    }

                    <div id="lab-layout-safety-gear">
                        <span onClick={this.toggleGoggles}>
                            {
                                this.state.goggles ?
                                    <img src="/images/goggles.png" id="lab-layout-goggle-image" /> :
                                    <span className="fas fa-undo" style={{ color: "#aaa" }} />
                            }
                        </span>

                        <br />

                        <span onClick={this.toggleCoat}>
                            {
                                this.state.coat ?
                                    <img src="/images/labcoat.png" id="lab-layout-coat-image" /> :
                                    <span className="fas fa-undo" style={{ color: "#aaa" }} />
                            }
                        </span>

                    </div>

                    <div id="topPart">
                        <Examiner />
                    </div>
                    <div id="midPart">
                        <Table />
                    </div>
                    <div id="bottomPart">
                        <Cupboard parentComponent={this} />
                    </div>

                </div>
                <SoundControls soundPlayer={this.props.soundPlayer} />
            </div>
        )
    }

}

export default withRouter(LabLayout)