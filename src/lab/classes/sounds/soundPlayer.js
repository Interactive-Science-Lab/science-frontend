import soundtrack from './soundtrack'
import soundEffect from './soundEffect'

class soundPlayer {
    constructor() {
        this.musicVolume = this.defaultSound('music')
        this.soundEffectVolume = this.defaultSound('soundfx')
        
        this.music = new soundtrack("science soundtrack.mp3")

        this.sounds = {
            drag: new soundEffect("sounds/drag.wav"),
            drop: new soundEffect("sounds/drop.wav"),
            click: new soundEffect("sounds/click.wav"),
            remove: new soundEffect("sounds/remove.wav"),
            light: new soundEffect("sounds/lightswitch.wav"),
            error: new soundEffect("sounds/error.wav"),
            openDrawer: new soundEffect("sounds/draweropen.wav"),
            closeDrawer: new soundEffect("sounds/drawerclose.wav")
        }

        if(this.musicVolume !== '0') {
            this.music.play( this.musicVolume )
        }

    }

    defaultSound = (string) => {
        let lS = localStorage.getItem(string) || '50'
        if (lS === 'on' || lS === 'off') { lS = '50' }
        return lS
    }

    toggleMusic = (e) => {
        let newVal = e.target.value

        localStorage.setItem('music', newVal)
        this.musicVolume = newVal

        this.music.stop()
        this.music.play(newVal)

        return this
    }

    toggleSoundFx = (e) => {
        let newVal = e.target.value
        this.soundEffectVolume = newVal
        localStorage.setItem('soundfx', newVal)

        return this
    }

    playEffect = (name, vol = null) => {
        this.sounds[name].play( this.soundEffectVolume, vol )
    }

    customSoundEffect = (soundEffect, vol = null) => {
        soundEffect.play( this.soundEffectVolume, vol )
    }

}

export default soundPlayer


