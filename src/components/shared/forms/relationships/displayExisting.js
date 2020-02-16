import React from 'react'
import HandleForm from '../miniHandler'

class Existing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const {rConfig, info, update, formClass} = this.props
    return rConfig.records.length > 0 ?
            rConfig.records.map(item => <div>
                <HandleForm item={item.record} settings={rConfig.resourceSettings} formClass={formClass} existing={true} info={rConfig} update={update} />
            </div> 
            )
            : ""
        }




}

export default Existing
