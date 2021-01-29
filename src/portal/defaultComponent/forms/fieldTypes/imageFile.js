
import React from 'react'
import { Input } from 'reactstrap'

class Field extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleChange = (e) => {
        if (e.target.files[0]) {
            this.props.component.props.updateItem({
                ...this.props.component.props.item,
                image_raw: e.target.files[0],
                image_preview_url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    render() {
        const { field, item } = this.props.component.props
        return <div>
            <img src={item.image_preview_url ? item.image_preview_url : field.value} height="50px" alt={item.image_title} /><br />
            <Input type="file" name={'image_raw'} onChange={this.handleChange} />
        </div>
    }
}

export default Field
