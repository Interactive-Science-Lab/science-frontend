import React from 'react'

import { LabContext } from 'project/lab/labContext'




class ExperimentLab extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            openShelf: false
        }
    }

    toggleOpen = () => {
        this.props.selectNum(this.props.num)
    }

    render() {

        let { drawer, filter, list } = this.props
        const { masterItemList, state } = this.context


        if (drawer) {
            

            let itemType = drawer.object_type

            return <div className={`shelf ${this.props.openNum === this.props.num ? 'open' : 'close'}-shelf`}>

                <div className='shelf-contents' style={{ margin: '0px 0 0px', position: 'absolute', bottom: '100%', width: '100%', paddingBottom: '0px' }}>
                    {list.map(item =>
                        <div
                            draggable
                            className={`inventory-item `}
                            data-itemType={itemType}
                            data-shelf-option={filter}
                            data-id={item.container_id || item.tool_id || item.object_item_id || item.substance_id}
                            data-name={item.display_name}>
                            <p style={{ cursor: 'grab', color: 'white', padding: '5px', borderBottom: '2px solid #0f0a04', borderTop: '2px solid #2f2a24' }}><span style={{ cursor: 'grab', color: 'white' }} class="fas fa-caret-right"></span>
                            &nbsp;{item.display_name} {filter === 'frozen' ? "(Frozen)" : null}
                            </p>
                        </div>)}
                </div>

                <div style={{ textAlign: 'center' }}>
                    {this.props.openNum === this.props.num ?
                        <div className="" style={{ cursor: 'pointer' }} onClick={this.toggleOpen}>
                            <span className="fas fa-chevron-up" style={{ fontSize: '20px' }}></span>
                            {drawer.name}
                            <span className="fas fa-chevron-up" style={{ fontSize: '20px' }}></span>
                            <p className="ttip">Close {itemType}</p>
                        </div>


                        :

                        <div className="" style={{ cursor: 'pointer' }} onClick={this.toggleOpen}>
                            {drawer.name != "" ? <span className="fas fa-chevron-down" style={{ fontSize: '20px' }}></span> : ""}
                            {drawer.name}
                            {drawer.name != "" ? <span className="fas fa-chevron-down" style={{ fontSize: '20px' }}></span> : ""}
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
// {masterItemList.objects.map(item => <div draggable className="inventory-item" data-itemType='objects' data-id={item.id}  data-name={item.display_name}>
//     <h5 style={{cursor:'grab'}}>+ {item.display_name}</h5>
// </div>)}
// </div>
// <div className="shelf">
// {masterItemList.containers.map(item => <div draggable className="inventory-item" data-itemType='containers' data-id={item.id}  data-name={item.display_name}>
//     <h5>+ {item.display_name}</h5>
// </div>)}
// </div>