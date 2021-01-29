import React from 'react'

class ItemComponentInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { item } = this.props
        let record = item.record

        let bigImages = ["Frog", "Diffusion Cells", "Osmosis Cells", "Mitosis Microscope Slides", "Urine Sample", "Codon Sequences", "Blood Antibody Card", "Petri Dish With Bacteria A", "Petri Dish With Bacteria B"]

        let style = {}
        if (bigImages.includes(item.name)) { style = { maxWidth: '100%' } }

        return <div className="">
            <div className='item-name'>
                <img
                    draggable={false}
                    src={`/images/${item.getSprite()}`}
                    style={style}
                    alt={item.name}
                />
            </div>

            {item.itemType !== 'containers' ?
                <div className='item-description'>
                    <i>{record.instructions || record.description}</i>
                </div> : ""}

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
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                        <option>35</option>
                        <option>40</option>
                        <option>45</option>
                        <option>50</option>
                        <option>75</option>
                        <option>100</option>
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
                </div> : "") : null
            }</div>


            <div className="item-used">{
                item.usedItem ? (item.usedItem.name && item.name !== 'Dissection Tray' ? <div><hr />
                    <div>Item:</div>
                    <div style={{ overFlowY: "scroll" }} className="tool-item ttipalt">
                        <span className='drag-item'
                            style={{ width: '50%', margin: '0 auto', padding: '5%', background: 'rgba(255,255,255,.5)' }}
                            data-itemtype={item.usedItem.itemType}
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

export default ItemComponentInformation