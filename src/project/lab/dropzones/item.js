import React from 'react'
import PhysicsExperiment from '../animations/physicsExperiment'

class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        if (this.props.item?.name) {
            return <ItemComponent {...this.props} />
        } else {
            // IF there's no item, and we're looking at the exam zone, show the things.
            if (this.props.i === 0 && ([2, 3].includes(this.props.dropInt))) {
                return <BlankExaminer {...this.props} />
            } else {
                return <p className="dropzoneempty">Area {this.props.dropInt === 5 ? this.props.i + 3 : 9}</p>
            }
        }
    }

}

export default Item

class ItemComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { item } = this.props
        let record = item.record
        let style = {}
        if ([2, 3].includes(this.props.dropInt)) {
            style.padding = '65px 0 40px'
            //if (item.name === "Dissection Tray" || item.name === "Frog") { style.width = "max-content" }
        }
        

        return <div style={style} className={`drag-item lab-action instance-${item.instance_id}`} data-itemType={item.itemType} data-imgSrc={`/images/${item.getSprite()}`} data-instance={item.instance_id} draggable >

            <div className="lab-hover-popup-op" style={{zIndex: '100'}}>{this.itemOptions()}</div>

            {this.displayItem()}

            <div className="item-show-name lab-hover-popup-op">
                {item.name}
            
                {record.properties?.includes('displayProgress') ? <span> #{record.color}</span> : "" }
            
            
            </div>
        </div>
    }


    displayItem = () => {
        const { item } = this.props
        let record = item.record
        return <div className="">
            <div className='item-name'>
                {(item.name === "Frog") || (item.name === "Diffusion Cells") || (item.name === "Osmosis Cells") || (item.name === "Mitosis Microscope Slides") || (item.name === "Urine Sample") || (item.name === "Codon Sequences") || (item.name === "Blood Antibody Card") || (item.name === "Petri Dish With Bacteria A") || (item.name === "Petri Dish With Bacteria B") ?

                    <img
                        draggable={false}
                        src={`/images/${item.getSprite()}`}
                        style={{ maxWidth: '100%' }}
                        alt=""
                    />
                    : (
                        (item.name === "Frog" && [2, 3].includes(this.props.dropInt)) ?
                        <img
                        draggable={false}
                        src={`/images/${item.getSprite()}`}
                        style={{ maxWidth: 'none', width: '600px' }}
                        alt=""
                    />
                    :
                    <img
                        draggable={false}
                        src={`/images/${item.getSprite()}`}
                        alt=""
                    />

                    )
                }


                {/*item.usedItem ? <span className={`content-display ${
                    item.usedItem.name ? "far fa-check-circle" : 'far fa-circle'}`}>
                </span>
                : null*/}

            </div>
            {item.itemType !== 'containers' ? 
            <div className='item-description'>
                <i>{record.instructions || record.description}</i>
            </div> : "" }
            <div className="item-properties">
                {record.properties?.includes('display_volume') ? <h2>
                    Reading: {Math.round(item.getFillVolume() * 100) / 100.0 || 0}mL
                </h2> : ""}
                {record.properties?.includes('display_mass') ? <h2>
                    Reading: {Math.round(item.getItemMass() * 100) / 100.0 || 0}g
                </h2> : ""}
                {record.properties?.includes('heatsource-useable') ? <h2>
                    Mass: {Math.round(item.getHeatSourceMass() * 100) / 100.0 || 0}g
                </h2> : ""}
                {record.properties?.includes('display_temperature') ? <h2>
                    Reading: {item.getItemTemperature() === "None" ? "None" : `${Math.round(item.getItemTemperature() * 100) / 100.0 || 20}'C`}
                </h2> : ""}
                {record.properties?.includes('display_ph') ? <h2>
                    Reading: {item.getItemPh() ? Math.round(item.getItemPh() * 100) / 100.0 : "None"}
                </h2> : ""}
                {record.properties?.includes('timer') ? <h2>
                    Reading: {this.printTime(item.getItemTime() || 0)}
                </h2> : ""}

                {record.properties?.includes('atp-factory') ? <div>
                    <div className="atp-reading">Yielded <h3>-</h3> ATP</div>
                    <hr /> Molecules Glucose:
                <select className="atp-molecules">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>

                    <select className="atp-aerobic">
                        <option>Aerobic</option>
                        <option>Anaerobic</option>
                    </select>
                </div> : ""}


                


            </div>


            <div className="item-contents">{
                item.contents ? (item.contentCount() > 0 ? <div><hr />
                    <div>Contents:</div>
                    <div style={{ overFlowY: "scroll" }}>
                        {item.displayContents()}
                    </div>
                </div> : ""/*(item.itemType === 'containers' ? <p><hr />Drag objects to add them to this container.</p> : "")*/) : null
            }</div>


            <div className="item-used">{
                item.usedItem ? (item.usedItem.name && item.name !== 'Dissection Tray' ? <div><hr />
                    <div>Item:</div>
                    <div style={{ overFlowY: "scroll" }} className="tool-item ttipalt">
                        <span className='drag-item'
                            data-itemType={item.usedItem.itemType}
                            data-parent-instance={item.instance_id}
                            data-instance={item.usedItem.instance_id} draggable >
                            {item.usedItem.name}
                        </span>
                        <p className="ttip">Click and drag to take the item off of the tool.</p>
                    </div>
                </div> : "") : null
            }</div>


        </div>

    }

    // The "Option Buttons" that appear beneath an item
    itemOptions = () => {
        let item = this.props.item
        let record = item.record

        return <div className="item-options">
            {item.itemType === 'containers' ? <>

                {this.optionButton('trash', 'remove-item', 'Put Away')}
                {this.optionButton('backspace', 'empty-item', 'Empty Contents')}

            </> : ""}
            {item.itemType === 'tools' ? <>

                {this.optionButton('trash', 'remove-item', 'Put Away')}

                {this.optionButton('filter', 'split-item', 'Suck Up', 'scoop')}
                {this.optionButton('sync', 'combine-strain-item', 'Combine', 'scoop')}


                {this.optionButton('filter', 'strain-item', 'Strain', 'strain')}
                {this.optionButton('sync', 'combine-strain-item', 'Combine', 'strain')}

                {/* 
                {this.optionButton('filter', 'tare-item', 'Tare Balance', 'display_mass')}
                
                
                this.optionButton('burn', 'heat-item heat-lo', 'Heat Low', 'heatsource-flame')}
                {this.optionButton('fire-alt', 'heat-item heat-mid', 'Heat Mid', 'heatsource-flame')
                 */}
                {this.optionButton('fire', 'heat-item heat-hi', 'Heat Hi', 'heatsource-flame')}

                {this.optionButton('stopwatch', 'time-item time-lo', '5 Secs', 'timer')}
                {this.optionButton('clock', 'time-item time-mid', '1 Min', 'timer')}
                {this.optionButton('clock', 'time-item time-hi', '10 Min', 'timer')}

            </> : ""}
            {item.itemType === 'objects' ? <>

                {this.optionButton('trash', 'remove-item', 'Put Away')}


                {item.name === "Frog" ? 
                this.optionButton('chevron-right', 'advance-graphic', 'Dissect', 'progress') : 
                this.optionButton('chevron-right', 'advance-graphic', 'Advance Time', 'progress') }

                {this.optionButton('eye-dropper', 'reveal-item', 'Run Test', 'reveal-random')}
                {this.optionButton('chevron-right', 'run-atp-item', 'Run Cellular Respiration', 'atp-factory')}

                {record.properties?.includes('experiment_window') ? 
                <span id={`experiment-window-${item.instance_id}`} >
                    <PhysicsExperiment animationKind={record.properties[1]} />
                </span> : ""}

            </> : ""}
            {item.itemType === 'substances' ? <>

                {this.optionButton('trash', 'remove-item', 'Put Away')}
            </> : ""}

        </div>
    }

    optionButton = (sprite, action, text, property = null) => {
        let display = true
        if (property) {
            display = this.props.item.record.properties?.indexOf(property) > -1
        }

        if (display) {
            return <span>
                <span data-instance={this.props.item.instance_id} className={`format-link lab-action fas fa-${sprite} ${action}`}>{text === "Run Test" ? " " + text : ""}<span>{text}</span></span>
            </span>
        } else {
            return ""
        }

    }



    timify = (time) => {
        if (String(time).length === 1) {
            return `0${time}`
        } else {
            return time
        }
    }

    printTime = (time) => {
        return <span>{this.timify(Math.floor(time / 3600))}:{this.timify(Math.floor(time % 3600 / 60))}:{this.timify(time % 60)}</span>
    }
}

class BlankExaminer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="block-number-text">Lab Area {this.props.dropInt - 1}</p>

                <div className="ttiphover" style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%'}}>
                    <h1 style={{margin: 0, right: 0, top: 0, position: 'absolute' }}>?</h1>
                    <p className="ttip" style={{ width: '100%' }}>Drag items here to use them and see their information.</p>
                </div>

            </div>
            <div className="dropzoneempty" style={{ width: '100%', height: '10vh' }}></div>
        </div>
    }
}