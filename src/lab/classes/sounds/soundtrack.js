export default function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none"
    this.sound.crossOrigin = 'anonymous';
    document.body.appendChild(this.sound);
    this.play = function (volume) {
        this.sound.volume = (Number.parseInt(volume) / 100)
        this.sound.play()
        
    }
    this.stop = function () {
        this.sound.pause();
    }
}