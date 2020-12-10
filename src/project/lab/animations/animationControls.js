import React from 'react'
import Screen from './screen'


class AnimationControls extends React.Component {
    constructor(props) {
        super(props)

        //construct the initial selections into an object from the props
        let selections = {}
        props.info.options.map(option => selections[option.optionName] = option.optionSelections[0].name)

        this.state = {
            info: props.info,
            selections: selections,
            showOptions: true
        }
    }

    showOptions = (value = true) => { this.setState({ showOptions: value }) }

    combineOptions = () => {
        let ret = this.state.info.data
        let effects = []

        this.state.info.options.map(option => {
            let settings = {}
            let selectionName = this.state.selections[option.optionName]
            option.optionSelections.map(os => os.name === selectionName ?
                settings = os
                : null)

            if (settings.effects) { effects.push(settings.effects) }
            ret = { ...ret, ...settings.settings }

        })

        ret = JSON.parse(JSON.stringify(ret))

        effects.map(e => {
            Object.entries(e).map(effectSetting => {

                if (Array.isArray(ret[effectSetting[0]])) {
                    ret[effectSetting[0]][0] = effectSetting[1] * ret[effectSetting[0]][0]
                    ret[effectSetting[0]][1] = effectSetting[1] * ret[effectSetting[0]][1]
                } else {
                    ret[effectSetting[0]] = effectSetting[1] * ret[effectSetting[0]]
                }

            }
            )

        })

        return ret

    }

    setOption = (e) => {
        let option = e.target.getAttribute('data-option')
        let select = e.target.getAttribute('data-select')
        this.setState({ selections: { ...this.state.selections, [option]: select } })

    }


    render() {


        let xStyle = {
            color: '#9ACDE7',
            cursor: 'pointer',
            background: "#1B2B38",
            border: '1px outset #888',
            padding: '6px',
            margin: '4px',
            borderRadius: '6px',
            display: 'inline-block'
        }


        return <div style={{ width: 'min-content' }}  >
            <Screen {...this.combineOptions()} hideCallback={this.showOptions} displays={this.props.info.displays} />

            {this.state.showOptions ? <div>{

                this.state.info.options.map(option => <div style={{ background: 'linear-gradient(#9ACDE7, #9ACDE7, #5e8da5)', borderRadius: '6px', border: '2px outset #333', margin: '10px 0' }}>
                    <div><b>{option.optionName}</b></div> {option.optionSelections.map(selection =>
                        <span style={xStyle} onClick={this.setOption} data-option={option.optionName} data-select={selection.name}>
                            {this.state.selections[option.optionName] === selection.name ? <b><u style={{color:'white'}}>{selection.name}</u></b> : selection.name}
                        </span>
                    )}
                </div>)

            }</div> : ""}
        </div>
    }
}

export default AnimationControls