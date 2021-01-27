import React from 'react'

class SoundControls extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let core = this.props.coreComponent
        let coreState = core.state
        return (
            <div>
            <div>
                <span style={{ padding: '10px', display: "inline-flex", alignItems: 'center' }}>
                    Music: <span>
                        <input onChange={core.toggleMusic} type='range' value={Number.parseInt(coreState.music)} min="0" max="100" className='slider' id='musicRange' style={{ padding: '0 !important' }} />
                    </span>
                    {coreState.music}
                </span>

                <span style={{ padding: '10px', display: "inline-flex", alignItems: 'center' }}>
                    Effects: <span>
                        <input onChange={core.toggleSoundFx} type='range' value={Number.parseInt(coreState.soundEffects)} min="0" max="100" className='slider' id='effectRange' style={{ padding: '0 !important' }} />
                    </span>
                    {coreState.soundEffects}
                </span>
            </div>
            <i>If you are expecting music to start and it does not, it is because autoplay is disabled for your browser. Please toggle the volume button to reset the music.</i>
            </div>
        )
    }
}

export default SoundControls