import React from 'react'
import ContainerOptions from './containerOptions'
import ToolOptions from './toolOptions'
import ObjectOptions from './objectOptions'
import SubstanceOptions from './substanceOptions'

class ItemComponentOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // The "Option Buttons" that appear beneath an item
    render() {
        let item = this.props.item
        let record = item.record

        return <div className="lab-hover-popup-op" style={{ zIndex: '100' }}>
            <div className="item-options">
                {item.itemType === 'containers' ? <ContainerOptions item={item} /> : ""}
                {item.itemType === 'tools' ? <ToolOptions item={item} /> : ""}
                {item.itemType === 'objects' ? <ObjectOptions item={item} /> : ""}
                {item.itemType === 'substances' ? <SubstanceOptions item={item} /> : ""}
            </div>
        </div>
    }

}

export default ItemComponentOptions