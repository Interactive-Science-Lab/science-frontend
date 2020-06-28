import React from 'react'

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
            if (this.props.i === 0 && ([2, 3].includes(this.props.dropInt) ) ){
                return <BlankExaminer {...this.props}  />
            } else {
                return <p className="dropzoneempty">Block {this.props.dropInt === 5 ? this.props.i+3 : 9}</p>
            }
        }
    }

}

export default Item

class ItemComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }
    render() {
        const { item } = this.props
        let record = item.record

        return <span className={`drag-item lab-action instance-${item.instance_id}`} data-itemType={item.itemType} data-instance={item.instance_id} draggable >
            <span className="item-show-name">{item.name}</span>
            <div className="">
                <div className='item-name'>
                    { (item.name === "Dissection Tray") || (item.name === "Petri Dish With Agar (A)") || (item.name === "Petri Dish With Agar (B)") ? 
                    
                    <img
                        draggable={false}
                        src={`/images/${item.getSprite()}`}
                        style={{maxWidth:'none'}}
                        alt=""
                    />
                    :
                    <img
                        draggable={false}
                        src={`/images/${item.getSprite()}`}
                        alt=""
                    />
                    }


                    {item.usedItem ? <span className={`content-display ${
                        item.usedItem.name ? "far fa-check-circle" : 'far fa-circle'}`}>
                    </span>
                        : null}

                </div>
                <div className='item-description'>
                    <i style={{ fontSize: '12px' }}>{item.itemType.charAt(0).toUpperCase() + item.itemType.substring(1, item.itemType.length - 1)}</i><br />
                    <i style={{ fontSize: '16px' }}>{record.description}</i>
                </div>
                <div className="item-properties">
                    {record.properties?.includes('display_volume') ? <div>
                        <hr /> Reading: {Math.round( item.getFillVolume() * 100) / 100.0 || 0}mL
                        </div> : ""}
                    {record.properties?.includes('display_mass') ? <div>
                        <hr /> Reading: {Math.round(item.getItemMass() * 100) / 100.0 || 0}g
                        </div> : ""}
                    {record.properties?.includes('heatsource-useable') ? <div>
                        <hr /> Mass: {Math.round( item.getHeatSourceMass() * 100) / 100.0 || 0}g
                        </div> : ""}
                    {record.properties?.includes('display_temperature') ? <div>
                        <hr /> Reading: {item.getItemTemperature() === "None" ? "None" : `${Math.round( item.getItemTemperature() * 100)/ 100.0 || 20}deg C` }
                        </div> : ""}
                    {record.properties?.includes('display_ph') ? <div>
                        <hr /> Reading: {Math.round(item.getItemPh() * 100) / 100.0 || 7}
                    </div> : ""}
                    {record.properties?.includes('timer') ? <div>
                        <hr /> Reading: {this.printTime(item.getItemTime() || 0)}
                    </div> : ""}
                    
                    {record.properties?.includes('atp-factory') ? <div>
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
                        <div className="atp-reading"></div>
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
                    {record.properties?.indexOf('progress') > -1 ? <span>
                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-chevron-right advance-graphic time-lo'><span>Advance</span></span>
                    </span> : ""}
                    
                    {record.properties?.indexOf('reveal-random') > -1 ? <span>
                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-eye-dropper reveal-item'><span>Run Test</span></span>

                    </span> : ""}
                    
                    {record.properties?.indexOf('atp-factory') > -1 ? <span>
                        <span data-instance={item.instance_id} className='format-link lab-action fas fa-chevron-right run-atp-item'><span>Run Test</span></span>

                    </span> : ""}
                
                
                
                
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
        this.state={}
    }

    render() {
        return <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="block-number-text">Block {this.props.dropInt - 1}</p>
                <div className="ttiphover" style={{ cursor: 'pointer', position: 'absolute', right: '0', top: '-4px' }}>
                    <h1>?</h1>
                    <p className="ttip" style={{width: '300px'}}>Drag items here to use them and see their information.</p>
                </div>
            </div>
            <div className="dropzoneempty" style={{ width: '100%', minHeight: '20px' }}></div>
        </div>
    }
}