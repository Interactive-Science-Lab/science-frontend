import React from 'react'

class IdList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const item = this.props.item
    const original = item.original_record
    switch (this.props.formClass) {
      case "images":
      case "thumbnail":
        return <img src={item.image_url} width="200px" />
      default:
        return <p>{JSON.stringify(this.props)}</p>
    }

  }

}



export default IdList
