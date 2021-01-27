import React from 'react'
import ItemComponentInformation from './itemComponentInformation'
import ItemComponentOptions from './itemComponentOptions/itemComponentOptions'

class ItemComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { item } = this.props
        let record = item.record

        //Set the padding different based on location.
        let style = {}
        if ([2, 3].includes(this.props.dropInt)) {
            style.padding = '5vh 0 3vh'
        }


        return (
            <div
                style={style}
                className={`drag-item lab-action instance-${item.instance_id}`}
                data-itemtype={item.itemType}
                data-imgSrc={`/images/${item.getSprite()}`}
                data-instance={item.instance_id}
                draggable >

                <ItemComponentOptions item={item} />

                <ItemComponentInformation item={item} />

                <div className="item-show-name lab-hover-popup-op">
                    {item.name}
                    {record.properties?.includes('displayProgress') ? <span> #{record.color}</span> : ""}
                </div>
                
            </div>
        )
    }
}

export default ItemComponent