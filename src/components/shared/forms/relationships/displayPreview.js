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
      case "symbol_connections":
        return <div>
          <h2>{original.symbol_name}</h2>
          <h4>{original.kind_name}</h4>
          <p>{`${['Source', 'Mention', 'Related', 'Association', 'Property', 'Alternate Form', 'Type', 'Item'][item.connection_relationship]}`}</p>
        </div>
      case "symbol_pantheons":
      case "kinds_used_by_pantheons":
      case "pantheons_history":
      case "pantheons_influenced":
      case "category_pantheons":
        return <h2>{original.pantheon_name}</h2>
      case "sources":
        return <div><h3>{item.source_title}</h3> <h4>item.source_article_title</h4></div>
      case "kind_symbol_connections":
      case "category_symbols":
        return <h2>{original.symbol_name}</h2>
      case "kind_info_kinds":
      case "pantheons_use_kinds":
      case "kinds_in_categories":
        return <h2>{original.kind_name}</h2>
      case "category_prereqs":
          return <h2>{original.category_name}</h2>
      case "symbol_resources":
          return <h2>{original.resource_title}</h2>

      default:
        return <p>{JSON.stringify(this.props)}</p>


    }

  }

}



export default IdList
