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
        handleParameter(this.props.component, 'sort', value)
    }

    handleOrder = (e) => {
      const value = e.target.value
      handleParameter(this.props.component, 'sortdir', value)
    }
    

    render() {
      return <div>
        Sort By <select onChange={this.handleSearch} value={this.props.component.state.loader.params.get('sort')} >
          {this.props.options.map(o => 
            <option value={o[0]}>{o[1]}</option>
          )}
        </select>
        <select onChange={this.handleOrder} value={this.props.component.state.loader.params.get('sortdir')} >
          
            <option value={'asc'}>Asc.</option>
            <option value={'desc'}>Desc.</option>
        </select>
      </div>
    }
}


export default Pagination;
