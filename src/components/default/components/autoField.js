import React from 'react'
import formHelpers from 'components/shared/forms/form_helpers'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    checkView = (settings) => {
        let ret = true
        if(settings[1].permissions) {
            const p = settings[1].permissions
            ret = p.indexOf('background') < 0 && p.indexOf('hidden') < 0 && p.indexOf(`${this.props.displayType}-hidden`) < 0
        }

        return ret
    }

    render() {
        const {item, settings, field, displayType}  = this.props

        return this.checkView(field.settings) ? (field.settings[1].customDisplay ? 
            field.settings[1].customDisplay(field.value) : <div>
                    {field.settings[1].label ? <div>{formHelpers.printifyName(field.name)} :</div> : ""}

                    
                
                    {field.settings[1].fieldType === 'string' ? <div>
                        {field.settings[1].titleField ? (displayType === 'view' ? 
                        (settings.name.view_title ? <h2>{field.value}</h2> : <h1>{field.value}</h1>)
                        
                        : <h3>{field.value}</h3>): field.value}
                    </div> : ""}
                    {field.settings[1].fieldType === 'icon' ? <span className={`fas fa-${field.value}`}></span> : ""}
                    {field.settings[1].fieldType === 'local-image' ? <img src={`/images/${field.value}`} /> : ""}
                    {field.settings[1].fieldType === 'number' ? field.value : ""}
                    {field.settings[1].fieldType === 'text' ? field.value : ""}
                    {field.settings[1].fieldType === 'html' ? <div dangerouslySetInnerHTML={{ __html: field.value }} /> : ""}
                    {field.settings[1].fieldType[0] === 'select-draft' ? (field.value !== 'public' ? field.value : "") : ""}
                    {field.settings[1].fieldType[0] === 'select-open' ? field.value  : ""}
                    {field.settings[1].fieldType[0] === 'select-custom' ? field.value : ""}
                    {field.settings[1].fieldType === 'boolean' ? field.name + ": " + field.value : ""}
                    {field.settings[1].fieldType === 'object' ? <div>
                        {Object.entries(field.value || {}).map(f => <div>
                            {f[0]}: {JSON.stringify(f[1])}
                        </div>)}
                    </div> : ""}

                    {field.settings[1].fieldType === 'reference' ? "Reference " + field.name + ": " + field.value : ""}
                    
                    {field.settings[1].suffix}

                    </div>) : ""

    }
}

export default Page
