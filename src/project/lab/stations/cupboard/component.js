import React from 'react'

import {LabContext} from 'project/lab/labContext'

import Shelf from './shelf'

import labSettings from '../../classes/fields'

class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openNum: 0,
            openSound: new soundEffect("sounds/draweropen.wav"),
            closeSound: new soundEffect("sounds/drawerclose.wav"),
        }
    }

    selectNum = (num) => {
        if(num === this.state.openNum) {
            this.setState({openNum: 0})
            this.state.closeSound.play()
        } else {
            this.setState({openNum: num})
            this.state.openSound.play()
        }
    }

    render() {
        const {masterItemList, state} = this.context

        let drawers = labSettings[state.labType].drawerList

        return <div id="shelveSection"  style={{ position: 'relative' }} >
            <div>
            <Shelf num={1} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[0][1]].filter(i => drawers[0][2].includes(i.display_name))} drawerName={drawers[0][0]} itemType={drawers[0][1]} />
            <Shelf num={2} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[1][1]].filter(i => drawers[1][2].includes(i.display_name))} drawerName={drawers[1][0]} itemType={drawers[1][1]} />
            <Shelf num={3} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[2][1]].filter(i => drawers[2][2].includes(i.display_name))} drawerName={drawers[2][0]} itemType={drawers[2][1]} />
            <Shelf num={4} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[3][1]].filter(i => drawers[3][2].includes(i.display_name))} drawerName={drawers[3][0]} itemType={drawers[3][1]} />
            </div>

            <div>
            <Shelf num={5} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[4][1]].filter(i => drawers[4][2].includes(i.display_name))} drawerName={drawers[4][0]} itemType={drawers[4][1]} />
            <Shelf num={6} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[5][1]].filter(i => drawers[5][2].includes(i.display_name))} drawerName={drawers[5][0]} itemType={drawers[5][1]} />
            <Shelf num={7} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[6][1]].filter(i => drawers[6][2].includes(i.display_name))} drawerName={drawers[6][0]} itemType={drawers[6][1]} />
            <Shelf num={8} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[7][1]].filter(i => drawers[7][2].includes(i.display_name))} drawerName={drawers[7][0]} itemType={drawers[7][1]} />
            </div>
            <div>&nbsp;</div>
        </div>
    }

}

ExperimentLab.contextType = LabContext
export default ExperimentLab

function soundEffect(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = .5
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }