import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import HandleForm from 'components/shared/forms/formHandler'
import RelationshipForm from 'components/shared/forms/relationship'

import settingHelper from 'db/settingHelpers'
import { ResourceContext } from './resourceContext'

class Edit extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = this.context
    this.permission = settingHelper.checkResourcePermission('edit', this.settings)
    this.state = {}
  }

  render() {
    const item = this.props.item
    const settings = this.settings


    return <div className="tpBlackBg color-box">
      {settingHelper.checkResourcePermission('view', settings) ?
        <Link to={`${settings.name.urlPath}/${item[settings.idField]}`}>Back To Page</Link>
        : ""}


      <HandleForm 
        item={item} 
        existing={true}
        updateItem={this.props.updateItem} loadPage={this.props.loadPage} />

      {settings.features.thumbnail ?
        <RelationshipForm item={item} formClass={"thumbnail"} settings={settings} update={this.loadPage} info={{ id: item[settings.idField], class: settings.name.us }} />
        : ""}


      {settings.features.user_info && item.info ?

        <RelationshipForm item={item} formClass={item.user_kind} settings={settings} update={this.loadPage} info={{ id: item[settings.idField], class: settings.name.us }} />
        : ""}

    </div>

  }
}

Edit.contextType = ResourceContext
export default withRouter(Edit)
