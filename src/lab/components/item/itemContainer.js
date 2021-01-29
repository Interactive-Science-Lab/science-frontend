import React from 'react'
import ItemComponent from './itemComponent'
import BlankExaminer from './blankExaminer'

class ItemContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.item?.name) {
            return <ItemComponent {...this.props} />
        } else {
            // IF there's no item, and we're looking at the exam zone, show the information buttons.
            if (this.props.i === 0 && ([2, 3].includes(this.props.dropInt))) {
                return <BlankExaminer {...this.props} />
            } else {
                return <p className="dropzoneempty">Area {this.props.dropInt === 5 ? this.props.i + 3 : 9}</p>
            }
        }
    }

}

export default ItemContainer
