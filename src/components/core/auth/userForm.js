import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import api, {curr_user} from 'helpers/api'

import HandleForm from '../../shared/forms/handler'

import defaults from  '../../../db/defaultObjects'

class PageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      axios
          .get(api.apiPath(`/users/${curr_user.user_id}`))
          .then(res =>
            this.setState({user: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.user
    const formFields = defaults.defaultFullFields('user', item)
    formFields.password = ""

    return <div  className="tpBlackBg">

        <HandleForm item={formFields} formClass={"users"} update={this.updateInfo} />
        
      </div>
  }
}

export default PageEdit;
