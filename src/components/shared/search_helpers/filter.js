import React from 'react';
import {handleParameter} from './search_helpers'


//This is a "Hard" filter- it only ever applies to one field. It should be considered the "highest" filter.
//Planning a "multi filter"- which allows to set field & autopulls value from backend.
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    handleSearch = (e) => {
        const value = e.target.value
        handleParameter(this.props.component, 'filter', value)
    }

    render() {
      return <div>
        {console.log(this.props.component.state.loader.params.get('filter'))}
        <select onChange={this.handleSearch} value={this.props.component.state.loader.params.get('filter')} >
          {this.props.options.map(o => <option value={o}>{o}</option>)}
        </select>
      </div>
    }
}


export default Pagination;
