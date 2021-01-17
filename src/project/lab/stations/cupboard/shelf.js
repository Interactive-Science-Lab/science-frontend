import React from 'react'

import { LabContext } from 'project/lab/labContext'




class ExperimentLab extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            openShelf: false
        }
    }

    toggleOpen = (e) => {
        this.props.selectNum(this.props.num)
    }

    close = () => {
        this.props.selectNum(0)
    }

    render() {

        let { drawer, filter, list } = this.props


        if (drawer) {
            

            let itemType = drawer.object_type

            return <div className={`shelf ${this.props.openNum === this.props.num ? 'open' : 'close'}-shelf`}>

                <div className='shelf-contents' 
                style={{ margin: '0', borderRadius: '4px', position: 'absolute', 
                 width: '100%', paddingBottom: '0px', border: '3px inset #406375' }}>
                    {list.map(item =>
                        <div
                            draggable
                            onDragEnd={this.close}
                            className={`inventory-item `}
                            data-itemtype={itemType}
                            data-shelf-option={filter}
                            data-id={item.container_id || item.tool_id || item.object_item_id || item.substance_id}
                            data-name={item.display_name}>
                            <p 
                            style={{ cursor: 'grab', color: '#ccc', padding: '5px', border: '3px outset #406385' }}>
                                <span style={{ cursor: 'grab', color: 'white' }}></span>
                            &nbsp;{item.display_name} {filter === 'frozen' ? "(Frozen)" : null}
                            <span className="fas fa-caret-right" style={{ fontSize: '12px', margin: "0 6px", color: 'grey', opacity:'.8' }}></span> </p>
                            
                        </div>)}
                </div>

                <div id="drawerName" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {this.props.openNum === this.props.num ?
                        <div className="" style={{ cursor: 'pointer'}} onClick={this.toggleOpen}>
                            <span className="fas fa-chevron-up" style={{ fontSize: '12px', margin: "0 6px" }}></span>
                            {drawer.name}
                            <span className="fas fa-chevron-up" style={{ fontSize: '12px', margin: "0 6px" }}></span>
                            <p className="ttip">Close {itemType}</p>
                        </div>


                        :

                        <div className="" style={{ cursor: 'pointer' }} onClick={this.toggleOpen}>
                            {drawer.name !== "" ? <span className="fas fa-chevron-down" style={{ fontSize: '12px', margin: "0 6px" }}></span> : ""}
                            {drawer.name}
                            {drawer.name !== "" ? <span className="fas fa-chevron-down" style={{ fontSize: '12px', margin: "0 6px" }}></span> : ""}
                            <p className="ttip">Open {itemType}</p>
                        </div>


                    }
                </div>

            </div>
        } else {
            return ""
        }
    }

}

ExperimentLab.contextType = LabContext
export default ExperimentLab


// <div className="shelf">
// {masterItemList.objects.map(item => <div draggable className="inventory-item" data-itemtype='objects' data-id={item.id}  data-name={item.display_name}>
//     <h5 style={{cursor:'grab'}}>+ {item.display_name}</h5>
// </div>)}
// </div>
// <div className="shelf">
// {masterItemList.containers.map(item => <div draggable className="inventory-item" data-itemtype='containers' data-id={item.id}  data-name={item.display_name}>
//     <h5>+ {item.display_name}</h5>
// </div>)}
// </div>