import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import api from 'helpers/api'

import HandleForm from 'components/shared/forms/handler'
import RelationshipForm from 'components/shared/forms/relationship'

import defaults from  'db/defaultObjects'

class PageEdit extends React.Component {
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
          .get(api.apiPath(`${props.resourceSettings.name.urlPath}/${id}`))
          .then(res =>
            this.setState({post: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.post
    const settings = this.props.resourceSettings
    const formFields = defaults.defaultFullFields(settings.name.ls, item)

    return <div  className="tpBlackBg">

        <Link to={`${settings.name.urlPath}/${item[settings.idField]}`}>Back to Page</Link>

        <HandleForm item={formFields} settings={settings} formClass={settings.name.lp} update={this.updateInfo} />

        { settings.features.thumbnail ? 
        <RelationshipForm item={item} formClass={"thumbnail"} settings={settings} update={this.updateInfo} info={ {id: item[settings.idField], class: settings.name.us}  } />
        : "" }
        
      </div>
  }
}

export default withRouter(PageEdit);
