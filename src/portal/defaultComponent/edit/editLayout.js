import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import HandleForm from 'portal/defaultComponent/forms/component/form'
import RelationshipForm from 'portal/defaultComponent/forms/references/relationship'

import { ResourceContext, resourceDefaults } from '../../asteroid/contexts/resourceContext'


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

      {/* the form for the item being passed in  The item itself being passed in. */}
      
      <HandleForm
        item={item}
        action = {'edit'}
        updateItem={this.props.updateItem}
        loadPage={this.props.loadPage} />

      {/** Features!- Additional features that have their own forms. */}
      { settings.getControlReferences().map( referenceField => {
        
        let resourceSettings = resourceDefaults( referenceField.info.resourceName )
        return <ResourceContext.Provider value={resourceSettings}>
          <RelationshipForm {...this.props} referenceField={referenceField} />
        </ResourceContext.Provider>
      })}


     

    </div>

  }
}

Edit.contextType = ResourceContext
export default withRouter(Edit)
