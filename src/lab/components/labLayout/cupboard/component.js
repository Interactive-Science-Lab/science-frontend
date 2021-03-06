import React from 'react'

import { LabContext } from 'lab/labContext'

import Shelf from './shelf'


class ExperimentLab extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            openNum: 0
        }
    }

    selectNum = (num) => {
        if (num === this.state.openNum) {
            this.setState({ openNum: 0 })
            this.context.soundPlayer.playEffect('closeDrawer')
        } else {
            //if (!this.props.parentComponent.state.goggles && !this.props.parentComponent.state.coat) {
                this.setState({ openNum: num })
                this.context.soundPlayer.playEffect('openDrawer')
            //} else {
            //    this.context.soundPlayer.playEffect('error')
            //    this.props.parentComponent.setState({ message: "Please wear the labcoat & goggles before starting an experiment." })
            //}
        }
    }

    getList = (drawer) => {

        let list = []
        if (drawer && drawer.objects) {
            drawer.objects.map((o) => {
                let dId = Number.parseInt(o)
                this.context.masterItemList[drawer.object_type || 'objects'].map(i => {
                    let oId = (i.container_id || i.tool_id || i.object_item_id || i.substance_id)
                    if (dId === oId) {
                        list.push(i)
                    }
                })
            })
        }
        return list
    }

    render() {
        const { masterItemList, state } = this.context

        let drawers = []
        masterItemList.drawers.map((d) => d.class === state.labType ? drawers.push(d) : "")
        drawers = drawers.sort((a, b) => a.order - b.order)
        if (drawers.length > 0) {

            return <div id="shelveSection" style={{ position: 'relative' }} >
                <div>
                    <Shelf num={1} openNum={this.state.openNum} selectNum={this.selectNum} drawer={drawers[0]} list={this.getList(drawers[0])} />
                    <Shelf num={2} openNum={this.state.openNum} selectNum={this.selectNum} drawer={drawers[1]} list={this.getList(drawers[1])} />
                    <Shelf num={3} openNum={this.state.openNum} selectNum={this.selectNum} drawer={drawers[2]} list={this.getList(drawers[2])} />
                    <Shelf num={4} openNum={this.state.openNum} selectNum={this.selectNum} drawer={drawers[3]} list={this.getList(drawers[3])} />
                </div>

                <div>
                    <Shelf num={5} openNum={this.state.openNum} selectNum={this.selectNum} drawer={drawers[4]} list={this.getList(drawers[4])} />
                    <Shelf num={6} openNum={this.state.openNum} selectNum={this.selectNum} drawer={drawers[5]} list={this.getList(drawers[5])} />
                    <Shelf num={7} openNum={this.state.openNum} selectNum={this.selectNum} drawer={drawers[6]} list={this.getList(drawers[6])} />
                    <Shelf num={8} openNum={this.state.openNum} selectNum={this.selectNum} drawer={drawers[7]} list={this.getList(drawers[7])} />
                </div>
            </div>
        } else {
            return ""
        }
    }

}

ExperimentLab.contextType = LabContext
export default ExperimentLab