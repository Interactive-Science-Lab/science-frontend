import React from 'react'

export default function TextOutput(props) {
    const {text, title} = props
    let returnValue = null;
    
    if(text) {
        returnValue = text.split('\n').map(line => {
            switch (line[0]) {
                case ">":
                    return <h4>{line.substr(1)}</h4>
                default: 
                    return <p>{line}</p>
            }
        })
    } else {
        returnValue = "Please fill in."
    }

    return <div className="text-block">
        <h3 className="text-block-title">{title}</h3>
        <div className="text-block-content">{ returnValue }</div>
    </div>
    
}
