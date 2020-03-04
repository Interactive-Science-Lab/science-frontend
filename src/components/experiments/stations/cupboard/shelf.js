import React from 'react'

import { LabContext } from 'components/experiments/db/labContext'




class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openShelf: false
        }
    }

    toggleOpen = () => {
        this.setState({ openShelf: !this.state.openShelf })
    }

    render() {
        const { list, side, itemType } = this.props

        return <div style={{ position: 'relative' }} className={`shelf ${side}-shelf ${this.state.openShelf ? 'open' : 'close'}-shelf`}>

            <div className='shelf-contents' style={{height:'100%', overflowY: 'scroll', paddingBottom: '40px'}}>
                {list.map(item =>
                    <div
                        draggable
                        className={`inventory-item `}
                        data-itemType={itemType}
                        data-id={item.container_id || item.tool_id || item.object_item_id || item.substance_id }
                        data-name={item.container_name || item.tool_name || item.object_name || item.substance_name }>
                        <p style={{ cursor: 'grab', color: 'white', padding: '15px', borderBottom: '2px solid #0f0a04', borderTop: '2px solid #2f2a24' }}><span style={{ cursor: 'grab', color: 'white' }} class="fas fa-caret-right"></span> 
                            {item.container_name || item.tool_name || item.object_name || item.substance_name}
                        </p>
                    </div>)}



            </div>

            <div style={{ position: 'absolute', bottom: '5px', width: '100%' }}>
                {this.state.openShelf ?
                    <div className="ttiphover" style={{ cursor: 'pointer' }} onClick={this.toggleOpen}>
                        <h1 className="fas fa-chevron-right"></h1>
                        <p className="ttip">Close {this.props.itemType}</p>
                    </div>


                    :

                    <div className="ttiphover" style={{ cursor: 'pointer' }} onClick={this.toggleOpen}>
                        <h1 className="fas fa-chevron-left"></h1>
                        <p className="ttip">Open {this.props.itemType}</p>
                    </div>


                }
            </div>

        </div>
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