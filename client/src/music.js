import tool from './tool'

class Music {
    constructor() {
        this.names = [
            'bg',
            'click',
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
        const winMusic = this.musics['win']
        if (!winMusic) return
        winMusic.volume = 0.5
        winMusic.currentTime = 0
        winMusic.play()
    }

    lose() {
        const loseMusic = this.musics['lose']
        if (!loseMusic) return
        loseMusic.volume = 0.5
        loseMusic.currentTime = 0
        loseMusic.play()
    }

    click() {
        const clickMusic = this.musics['click']
        if (!clickMusic) return
        clickMusic.volume = 0.5
        clickMusic.currentTime = 0
        clickMusic.play()
    }

    playBg() {
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