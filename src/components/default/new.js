import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import api from 'helpers/api'
import {withRouter} from 'react-router'

import HandleForm from 'components/shared/forms/handler'


class NewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        post: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      const id = props.match.params.id
      axios
          .get(api.apiPath(`/posts/${id}`))
          .then(res =>
            this.setState({post: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.post
    const settings = this.props.resourceSettings
    const formFields = {} //defaults.defaultFullFields('post', item)

    return <div  className="tpBlackBg color-box">
        <h1>{settings.name.new_title}</h1>
        <HandleForm 
          item={formFields} 
          settings={settings} 
          formClass={settings.name.lp} 
          update={this.updateInfo} 
          redirectIdField={settings.idField} />
        
      </div>
  }
}

export default withRouter(NewPage);
