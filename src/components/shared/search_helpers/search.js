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
      return <div>
        <h3>Search</h3>
        <input type="text" onChange={this.handleSearch} value={this.props.component.state.loader.params.get('search')} />
      </div>
    }
}


export default Pagination;
