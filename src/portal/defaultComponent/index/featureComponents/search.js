import React from 'react';
import {handleParameter} from './search_helpers'

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    handleSearch = (e) => {
        const value = e.target.value
        handleParameter(this.props.component, 'search', value)
    }

    render() {
      return <span>
        <input 
          type="text" 
          onChange={this.handleSearch} 
          placeholder={`Search ${this.props.component.context.get('friendly')}...`}
          value={this.props.component.state.loader.params.get('search')} 
        />
      </span>
    }
}


export default Pagination;
