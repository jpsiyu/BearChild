class Music {
    constructor() {
        this.names = [
            'bg',
        ]
        this.musics = {}
    }

    loadMusics(callback) {
        let readyNum = 0
        const totalNum = this.names.length
        this.names.forEach(name => {
            const m = new Audio(`${name}.mp3`)
            m.oncanplay = () => {
                readyNum++
                this.musics[name] = m
                if ((readyNum === totalNum) && callback) callback()
            }
        })
    }

    playBg() {
        const bgMusic = this.musics['bg']
        if (!bgMusic.loop) bgMusic.loop = true
        bgMusic.volume = 0.2
        bgMusic.play()
    }

    pauseBg() {
        const bgMusic = this.musics['bg']
        bgMusic.pause()
    }
}

export default Music