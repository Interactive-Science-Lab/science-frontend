import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import HandleForm from 'main/defaultComponent/forms/formHandler'
import RelationshipForm from 'main/defaultComponent/forms/relationship'

import { ResourceContext, resourceDefaults } from './resourceContext'


class Edit extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.settings = this.context
    this.state = {}
  }

  render() {
    const item = this.props.item
    const settings = this.settings

    return <div className="tpBlackBg color-box">
      {settings.checkPermission('view', item) ?
        <Link to={`${settings.get('urlPath')}/${item[settings.get('idField')]}`}>Back To Page</Link>
        : ""}


      <h1>{settings.get('editTitle')}</h1>
      <p>{settings.get('editText')}</p>

      {/* the form for the item being passed in*/}
      {/* The item itself being passed in. */}
      
      <HandleForm
        item={item}
        action = {'edit'}
        updateItem={this.props.updateItem}
        loadPage={this.props.loadPage} />


      {settings.features.thumbnail ?
        <ResourceContext.Provider value={resourceDefaults('thumbnails')}>
          <RelationshipForm item={item} formClass={"thumbnail"} settings={settings} update={this.props.loadPage} info={{ id: item[settings.fields.idField], class: settings.names.us }} />
        </ResourceContext.Provider>
        : ""}


      {settings.features.userInfo && item.info ?
        <ResourceContext.Provider value={resourceDefaults(item.user_kind)}>
          <RelationshipForm item={item} formClass={item.user_kind} settings={settings} update={this.props.loadPage} info={{ id: item[settings.fields.idField], class: settings.names.us }} />
        </ResourceContext.Provider>
        : ""}

    </div>

  }
}

Edit.contextType = ResourceContext
export default withRouter(Edit)
