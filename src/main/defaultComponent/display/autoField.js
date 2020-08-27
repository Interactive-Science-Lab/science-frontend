import React from 'react'

//This component is responsible for displaying a field auto-like
class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { settings, field } = this.props
        /*console.log(field.settings)*/
        return <div>
            {field.settings.label ? <div>{field.settings.printifyName(settings)}:</div> : ""}

            {field.settings.fieldType === 'string' ? <div>
               { JSON.stringify(field.settings.titleField ? this.displayTitle() : field.value) }
            </div> : ""}

            {field.settings.fieldType === 'icon' ? <span className={`fas fa-${field.value}`}></span> : ""}

            {field.settings.fieldType === 'local-image' ? <img src={`/images/${field.value}`} alt="" /> : ""}

            {field.settings.fieldType === 'number' ? field.value : ""}

            {field.settings.fieldType === 'text' ? field.value : ""}

            {field.settings.fieldType === 'html' ? <div dangerouslySetInnerHTML={{ __html: field.value }} /> : ""}

            {field.settings.fieldType[0] === 'select-draft' ? (field.value !== 'public' ? field.value : "") : ""}
            {field.settings.fieldType[0] === 'select-open' ? field.value : ""}
            {field.settings.fieldType[0] === 'select-custom' ? field.settings.fieldType[1].map(o => o[0] === field.value ? o[1] : null) : ""}
            {field.settings.fieldType === 'boolean' ? (field.value ? "Yes" : "No") : ""}

            {field.settings.fieldType === 'object' ? <div>
                {Object.entries(field.value || {}).map(f => <div>
                    {f[0]}: {JSON.stringify(f[1])}
                </div>)}
            </div> : ""}

            {field.settings.fieldType === 'array' ? JSON.stringify(field.value) : ""}

            {field.settings.fieldType === 'reference' ? <div>
                {field.settings.info.title ? field.settings.info.title + ": " : ""} 
                { JSON.stringify(this.props.item[field.settings.targetField]) } 
            </div>: ""}

            {field.settings.suffix}

        </div>

    }

    displayTitle = () => {
        const { settings, field, action } = this.props
        if (action === 'view' ) {
            if(settings.get('viewTitle')) {
                return <h2>{field.value}</h2>
            } else {
                return <h1>{field.value}</h1>
            }
        } else {
            return <h3>{field.value}</h3>
        }
    }
}

export default Page
