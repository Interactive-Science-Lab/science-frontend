import React from 'react'
import { withRouter } from "react-router-dom";


import { ResourceContext } from 'main/asteroid/contexts/resourceContext'
import DefaultFormField from './formField'

//This component maps over the fields and controls whether it shows a default form field or the custom.
class FormFields extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.state = {}
    }

    render() {
        let action = this.props.action
        let lastCategory = ""



        return this.settings.getItemFields(this.props.item).sort((a, b) => {

            let aCat = a.settings.info.category || ""
            let bCat = b.settings.info.category || ""

            let aOrder = a.settings.info.order || 100
            let bOrder = b.settings.info.order || 100

            if (aCat !== bCat) { return aCat.localeCompare(bCat) }
            else { return aOrder - bOrder }

        }).map(field => {

            if (field.settings.checkPermission(action, this.props.item, this.settings.fields.selfId)) {
                let customForm = field.settings.checkCustomDisplay(action)

                if (customForm) {
                    return customForm(this.props.updateItem)
                } else {
                    //Essentially we map through each fieldOBJECT and pass through the item
                    if(field.settings.info.permission_id !== 5){
                        
                        
                    if (field.settings.info.category !== lastCategory) {
                        lastCategory = field.settings.info.category
                        return <div>
                            <h3>{lastCategory}</h3>
                            <DefaultFormField field={field} {...this.props} />

                        </div>
                    }
                    else {
                        return <DefaultFormField field={field} {...this.props} />
                    }

                }


                }

            } else {
                return null
            }

        })
    }
}

FormFields.contextType = ResourceContext
export default withRouter(FormFields)

















