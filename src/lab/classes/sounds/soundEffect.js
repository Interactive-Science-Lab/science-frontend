export default function soundEffect(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 1
    this.sound.crossOrigin = 'anonymous';
    document.body.appendChild(this.sound);
    this.play = function (vol, multiplier) {
        if (multiplier === 'loud') {
            this.sound.volume = (Number.parseInt(vol) / 100)
        } else {
            this.sound.volume = (Number.parseInt(vol) / 300)
        }
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}