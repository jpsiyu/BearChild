import tool from './tool'

class Music {
    constructor() {
        this.names = [
            'bg',
            'win',
            'lose',
        ]
        this.musics = {}
        this.active = false
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
        if(!this.active) return
        const m = this.musics[name]
        if (!m) return
        if(m.muted) m.muted = false
        m.volume = 0.5
        m.currentTime = 0
        m.play()

    }

    playBg() {
        if(!this.active) return
        const bgMusic = this.musics['bg']
        if (!bgMusic) return

        if(bgMusic.muted) bgMusic.muted = false
        if (!bgMusic.loop) bgMusic.loop = true
        bgMusic.volume = 0.2
        bgMusic.play()
    }

    pauseBg() {
        const bgMusic = this.musics['bg']
        if (bgMusic)
            bgMusic.pause()
    }

    activeAllMusic(){
        if(this.active) return
        this.active = true
        Object.keys(this.musics).forEach( key => {
            this.musics[key].play()
        })
        this.playBg()
    }
}

export default Music