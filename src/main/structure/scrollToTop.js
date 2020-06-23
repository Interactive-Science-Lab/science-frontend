import React from 'react'
import {withRouter} from 'react-router'

//Literally this is just a component that makes the screen pop back up to the top with a url change

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }
  
    render() {
      return this.props.children
    }
  }
  
  export default withRouter(ScrollToTop)