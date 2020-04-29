import React from 'react'

import {LabContext} from 'components/experiments/db/labContext'

import Shelf from './shelf'



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
        const {masterItemList} = this.context
        const objectList = ['Osmium Chunk', 'Gold Piece', 'Bolt', 'Marble', 'Seltzer Tablet', 'Scrap Metal']
        const observeList = ["Mystery #1", "Mystery #2", "Mystery #3", "Mystery #4", "Mystery #5", "Mystery #6", "Mystery #7", "Mystery #8", "Mystery #9", "Mystery #10"]
        const actionList = ['Balance', 'Thermometer', 'pH Meter', 'Timer', 'Bunsen Burner', "Strainer", "Filter Paper", "Timer", "Candle"]
        const solidList = ['Hydrophillic Beads (lg)', 'Hydrophillic Beads (sm)', 'Salt', "Sodium Carbonate","Magnesium Sulfate","Potassium Chlorate",]
        const liquidList = ['Weak Base', 'Weak Acid']
        const frozenList = ['Water']
        const measureList = ["Micro Pipette", "Measuring Cup (50mL)", "Measuring Cup (10mL)", "Measuring Spoon (5mL)", "Measuring Spoon (1mL)", 'Eyedropper']

        return <div id="shelveSection"  style={{ position: 'relative' }} >
            <div>
            <Shelf num={1} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList.objects.filter(i => objectList.includes(i.display_name))}  itemType={'objects'} />
            <Shelf num={2} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList.containers}  itemType={'containers'} />
            <Shelf num={3} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList.objects.filter(i => observeList.includes(i.display_name)) } itemType={'objects'} filter={"measuring"}/>
            <Shelf num={4} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList.tools.filter(i => actionList.includes(i.display_name)) } itemType={'tools'} filter={"action"} />
            </div>

            <div>
            <Shelf num={5} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList.substances.filter(i => solidList.includes(i.display_name))} itemType={'substances'} filter={"solid"}/>
            <Shelf num={6} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList.substances.filter(i => liquidList.includes(i.display_name))} itemType={'substances'} filter={"liquid"}/>
            <Shelf num={7} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList.substances.filter(i => frozenList.includes(i.display_name))} itemType={'substances'} filter={'frozen'}/>
            <Shelf num={8} openNum={this.state.openNum} selectNum={this.selectNum} list={masterItemList.tools.filter(i => measureList.includes(i.display_name)) } itemType={'tools'} filter={"measuring"}/>
            </div>
            <div>&nbsp;</div>


        </div>
    }

}

ExperimentLab.contextType = LabContext
export default ExperimentLab