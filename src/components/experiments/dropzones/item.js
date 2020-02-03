import React from 'react'




class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    displayContents = (contents) => {
        const { masterItemList } = this.props
        let contentCount = {}

        contents.map(c => { 
            masterItemList[c.itemType].map(r => 
                r.id === c.id ? 
                    contentCount = this.countContent(contentCount, r.display_name, c.itemType)
                    : null
        )})

            
        return Object.entries(contentCount).map(entry => <div>{entry[0]} {entry[1].itemType === 'objects' ? 'x' + entry[1].count : ""}</div>)
    }

    countContent = (contentCount, display_name, itemType) => {
        if(contentCount[display_name]) { contentCount[display_name].count += 1 }
        else { 
            contentCount[display_name] = {
                count: 1,
                itemType,
                display_name
            }
        }
        return contentCount
    }

    render() {
        const { item, masterItemList } = this.props
        let record = {}
        let totalVolume = 0;
        if(item.contents) {
            { item.contents.map(c => <div>
                { masterItemList[c.itemType].map(r => r.id === c.id ? totalVolume += r.volume : "")  }
            </div>) }
        }
        
        if (item.name) {
            masterItemList[item.itemType].map(r => r.id === item.id ? record = r : "")
            return <span className='drag-item' data-itemType={item.itemType} data-instance={item.instance} draggable >
                <div>
                    <div className='item-name'><img draggable={false} src={`/images/${item.image || record.image}`} /></div>
                    <div className='item-volume'>{item.itemType === 'containers' ? <>Total Vol: {record.volume}mL</> : ""}</div>
                    <div className='item-description'><i style={{fontSize: '14px'}}>{record.description}</i></div>
                    <div className="item-properties">{ record.properties ? <div>
                        <hr /> Reading: {totalVolume} mL
                        
                    </div> : ""}    
                    </div>
                    <div className="item-contents">{
                        item.contents ? <div><hr />
                            <div>Contents:</div>
                            <div style={{overFlowY: "scroll"}}>
                                { this.displayContents(item.contents)}
                            </div>
                        </div> : ""
                    
                    }</div>
                </div>
            </span>
        } else {
            return null
        }
    }

}

export default Item