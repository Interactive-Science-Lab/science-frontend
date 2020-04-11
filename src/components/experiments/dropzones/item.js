import React from 'react'

import ClassHelpers from '../classes/itemsState'
import ContainerHelper from '../classes/containers'
import ToolHelper from '../classes/tools'
import MasterListHelper from '../classes/masterList'



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
            {/* IF there's no item, and we're looking at the exam zone, show the things.*/ }
            if (this.props.i === 0 && this.props.dropInt === 2) {
                return <BlankExaminer />
            } else {
                return null
            }
        }
    }

}

export default Item

class ItemComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { item, masterItemList, itemsState } = this.props
        let record = item.record

        let totalVolume = item.volume
        let totalMass = item.mass
        let temperature = item.temperature
        let ph = item.ph
        let time = item.time || item.usedItem?.time || 0

        return <span className='drag-item lab-action' data-itemType={item.itemType} data-instance={item.instance_id} draggable >
            <span className="item-show-name">{item.name}</span>
            <div className="">
                <div className='item-name'>
                    <img
                        draggable={false}
                        src={`/images/${item.getSprite()}`}
                    />


                    {item.contents ? <span className="content-display">{
                        JSON.stringify(item.contentCount())
                    }</span>
                        : null}
                    {item.usedItem ? <span className={`content-display ${
                        item.usedItem.name ? "far fa-check-circle" : 'far fa-circle'}`}>
                    </span>
                        : null}

                </div>
                <div className='item-volume'>
                    {item.itemType === 'containers' ? <>Total Vol: {record.hold_volume}mL</> : ""}
                </div>
                <div className='item-description'>
                    <i style={{ fontSize: '12px' }}>{item.itemType.charAt(0).toUpperCase() + item.itemType.substring(1, item.itemType.length - 1)}</i><br />
                    <i style={{ fontSize: '16px' }}>{record.description}</i>
                </div>
                <div className="item-properties">
                    {record.properties?.includes('display_volume') ? <div>
                        <hr /> Reading: {item.getFillVolume() || 0}mL
                        </div> : ""}
                    {record.properties?.includes('display_mass') ? <div>
                        <hr /> Reading: {item.getItemMass() || 0}g
                        </div> : ""}
                    {record.properties?.includes('heatsource-useable') ? <div>
                        <hr /> Mass: {item.getHeatSourceMass() || 0}g
                        </div> : ""}
                    {record.properties?.includes('display_temperature') ? <div>
                        <hr /> Reading: {item.getItemTemperature() || 20}deg C
                        </div> : ""}
                    {record.properties?.includes('display_ph') ? <div>
                        <hr /> Reading: {item.getItemPh() || 7}
                    </div> : ""}
                    {record.properties?.includes('timer') ? <div>
                        <hr /> Reading: {this.printTime(item.getItemTime() || 0)}
                    </div> : ""}
                </div>



                <div className="item-contents">{
                    item.contents ? (item.contentCount() > 0 ? <div><hr />
                        <div>Contents:</div>
                        <div style={{ overFlowY: "scroll" }}>
                            {item.displayContents()}
                        </div>
                    </div> : (item.itemType === 'containers' ? <p><hr />Drag objects to add them to this container.</p> : "")) : null
                }</div>


                <div className="item-used">{
                    item.usedItem ? (item.usedItem.name ? <div><hr />
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
                    </div> : <p><hr />{record.instructions}</p>) : null
                }</div>


            </div>
            <div className="item-options">
                {item.itemType === 'containers' ? <div>
                    <span data-instance={item.instance_id} className='format-link lab-action fas fa-trash remove-item'><span>Put Away</span></span>
                    <span data-instance={item.instance_id} className='format-link lab-action fas fa-backspace empty-item'><span>Empty Contents</span></span>
                </div> : ""}
                {item.itemType === 'tools' ? <div>
                    <span data-instance={item.instance_id} className='format-link lab-action fas fa-trash remove-item'><span>Put Away</span></span>
                    {record.properties?.indexOf('scoop') > -1 ? <span>

                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-filter split-item'><span>Suck Up</span></span>
                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-sync combine-strain-item'><span>Combine</span></span>

                    </span> : ""}
                    {record.properties?.indexOf('display_mass') > -1 ? <span>

                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-filter tare-item'><span>Tare Balance</span></span>

                    </span> : ""}
                    {record.properties?.indexOf('strain') > -1 ? <span>

                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-filter strain-item'><span>Strain</span></span>
                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-sync combine-strain-item'><span>Combine</span></span>

                    </span> : ""}
                    {record.properties?.indexOf('heatsource-flame') > -1 ? <span>

                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-burn heat-item heat-lo'><span>Heat Lo, 3mins- 25degrees</span></span>

                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-fire-alt heat-item heat-mid'><span>Heat Mid, 3mins- 50degrees</span></span>

                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-fire heat-item heat-hi'><span>Heat Hi, 3mins- 100degrees</span></span>

                    </span> : ""}
                    {record.properties?.indexOf('timer') > -1 ? <span>
                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-stopwatch time-item time-lo'><span>5 seconds</span></span>

                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-clock time-item time-mid'><span>1 minute</span></span>

                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-clock time-item time-hi'><span>10 minutes</span></span>

                    </span> : ""}
                </div> : ""}
                {item.itemType === 'objects' ? <div>
                    <span data-instance={item.instance_id} className='format-link lab-action fas fa-trash remove-item'><span>Put Away</span></span>
                </div> : ""}
                {item.itemType === 'substances' ? <div>
                    <span data-instance={item.instance_id} className='format-link lab-action fas fa-trash remove-item'><span>Put Away</span></span>
                </div> : ""}






            </div>
        </span>
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
    }

    render() {
        return <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5>
                </h5>
                <div className="ttiphover" style={{ cursor: 'pointer' }}>
                    <h1>?</h1>
                    <p className="ttip">Drop items here to see their readings, or just get a better look at them.<br />
                        Hint: Try putting a graduated cylinder here to see it's contents & volume,<br />
                        or the scale to see the object's mass.</p>
                </div>
            </div>
            <div className="dropzoneempty" style={{ width: '100%', height: '150px' }}></div>
        </div>
    }
}