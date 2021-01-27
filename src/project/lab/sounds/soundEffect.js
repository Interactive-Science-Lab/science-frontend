export default function soundEffect(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 1
    this.sound.crossOrigin = 'anonymous';
    document.body.appendChild(this.sound);
    this.play = function (obj, vol) {
        try {
            console.log(obj)
            if (vol === 'loud') {
                this.sound.volume = (Number.parseInt(obj.soundEffects) / 100)
            } else {
                this.sound.volume = (Number.parseInt(obj.soundEffects) / 300)
            }
            this.sound.play();
        } catch (err) {
            console.log(`Project.Lab.Core.soundEffect- ${err}`)
        }
    }
    this.stop = function () {
        this.sound.pause();
    }
}