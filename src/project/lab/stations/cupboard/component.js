import React from 'react'

import {LabContext} from 'project/lab/labContext'

import Shelf from './shelf'

import labSettings from '../../classes/fields'

class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openNum: 0
        }
    }

    selectNum = (num) => {
        if(num === this.state.openNum) {
            this.setState({openNum: 0})
        } else {
            this.setState({openNum: num})
        }
    }

    render() {
        const {masterItemList, state} = this.context

        let drawers = labSettings[state.labType].drawerList

        return <div id="shelveSection"  style={{ position: 'relative' }} >
            <div>
            <Shelf num={1} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[0][0]].filter(i => drawers[0][1].includes(i.display_name))} itemType={drawers[0][0]} />
            <Shelf num={2} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[1][0]].filter(i => drawers[1][1].includes(i.display_name))} itemType={drawers[1][0]} />
            <Shelf num={3} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[2][0]].filter(i => drawers[2][1].includes(i.display_name))} itemType={drawers[2][0]} />
            <Shelf num={4} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[3][0]].filter(i => drawers[3][1].includes(i.display_name))} itemType={drawers[3][0]} />
            </div>

            <div>
            <Shelf num={5} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[4][0]].filter(i => drawers[4][1].includes(i.display_name))} itemType={drawers[4][0]} />
            <Shelf num={6} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[5][0]].filter(i => drawers[5][1].includes(i.display_name))} itemType={drawers[5][0]} />
            <Shelf num={7} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[6][0]].filter(i => drawers[6][1].includes(i.display_name))} itemType={drawers[6][0]} />
            <Shelf num={8} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList[drawers[7][0]].filter(i => drawers[7][1].includes(i.display_name))} itemType={drawers[7][0]} />
            </div>
            <div>&nbsp;</div>
        </div>
    }

}

ExperimentLab.contextType = LabContext
export default ExperimentLab