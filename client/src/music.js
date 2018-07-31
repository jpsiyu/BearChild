import tool from './tool'

class Music {
    constructor() {
        this.names = [
            'bg',
            'win',
            'lose',
        ]
        this.musics = {}
    }

    loadMusics(callback) {
        let readyNum = 0
        const totalNum = this.names.length
        this.names.forEach(name => {
            const m = new Audio(`${name}.mp3`)
            m.muted = true
            if (tool.isSmartPhone()) {
                readyNum++
                this.musics[name] = m
                if ((readyNum === totalNum) && callback) {
                    callback()
                }

            } else {
                m.oncanplay = () => {
                    readyNum++
                    this.musics[name] = m
                    if ((readyNum === totalNum) && callback) {
                        callback()
                    }
                }

            }
        })
    }

    win() {
        this.playClip('win')
    }

    lose() {
        this.playClip('lose')
    }

    playClip(name){
        const m = this.musics[name]
        if (!m) return
        m.muted = false
        m.volume = 0.5
        m.currentTime = 0
        m.play()

    }

    playBg() {
        return
        const bgMusic = this.musics['bg']
        if (!bgMusic) return

        if (!bgMusic.loop) bgMusic.loop = true
        bgMusic.volume = 0.2
        bgMusic.play()
    }

    pauseBg() {
        const bgMusic = this.musics['bg']
        if (bgMusic)
            bgMusic.pause()
    }
}

export default Music