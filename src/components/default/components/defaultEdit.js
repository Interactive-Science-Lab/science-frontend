import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import HandleForm from 'components/shared/forms/formHandler'
import RelationshipForm from 'components/shared/forms/relationship'

import { ResourceContext } from './resourceContext'

class Edit extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = this.context
    this.permission = context.checkPermission('edit')
    this.state = {}
  }

  render() {
    const item = this.props.item
    const settings = this.settings


    return <div className="tpBlackBg color-box">
      {settings.checkPermission('view') ?
        <Link to={`${settings.get('urlPath')}/${item[settings.get('idField')]}`}>Back To Page</Link>
        : ""}


      <h1>{settings.get('editTitle')}</h1>
      <p>{settings.get('editText')}</p>

      {/* the form for the item being passed in*/}
      {/* The item itself being passed in. */}
      {/* Existing is TRUE because this is the edit form */}
      <HandleForm
        item={item}
        existing={true}
        updateItem={this.props.updateItem}
        loadPage={this.props.loadPage} />


      {/* Below are for forms for additional features, if they exist. */}
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
