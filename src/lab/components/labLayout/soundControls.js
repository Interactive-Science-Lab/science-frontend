import React from 'react'

class SoundControls extends React.Component {
    constructor(props) {
        super(props)

        let soundPlayer = this.props.soundPlayer

        this.state = {
            musicVolume: soundPlayer.musicVolume,
            soundEffectVolume: soundPlayer.soundEffectVolume
        }
    }

    setStateFromPlayer = (soundPlayer) => {
        let {musicVolume, soundEffectVolume} = soundPlayer
        this.setState({musicVolume, soundEffectVolume})
    }

    toggleMusic = async (e) => {
        let soundPlayer =  this.props.soundPlayer.toggleMusic(e)
        this.setStateFromPlayer( soundPlayer )
    }

    toggleSoundFx = (e) => {
        let soundPlayer =  this.props.soundPlayer.toggleSoundFx(e)
        this.setStateFromPlayer( soundPlayer )
    }

    render() {
        let {musicVolume, soundEffectVolume} = this.state
        return (
            <div>
            <div>
                <span style={{ padding: '10px', display: "inline-flex", alignItems: 'center' }}>
                    Music: <span>
                        <input onChange={this.toggleMusic} type='range' value={Number.parseInt(musicVolume)} min="0" max="100" className='slider' id='musicRange' style={{ padding: '0 !important' }} />
                    </span>
                    {musicVolume}
                </span>

                <span style={{ padding: '10px', display: "inline-flex", alignItems: 'center' }}>
                    Effects: <span>
                        <input onChange={this.toggleSoundFx} type='range' value={Number.parseInt(soundEffectVolume)} min="0" max="100" className='slider' id='effectRange' style={{ padding: '0 !important' }} />
                    </span>
                    {soundEffectVolume}
                </span>
            </div>
            <i>If you are expecting music to start and it does not, it is because autoplay is disabled for your browser. Please toggle the volume button to reset the music.</i>
            </div>
        )
    }
}

export default SoundControls