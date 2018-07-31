class Music {
    constructor() {
        this.names = [
            'click',
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

    click(){
        const clickMusic = this.musics['click']
        if(!clickMusic) return
        clickMusic.pause()
        clickMusic.volume = 0.5
        clickMusic.play()
    }

    playBg() {
        const bgMusic = this.musics['bg']
        if(!bgMusic) return

        if (!bgMusic.loop) bgMusic.loop = true
        bgMusic.volume = 0.2
        bgMusic.play()
    }

    pauseBg() {
        const bgMusic = this.musics['bg']
        if(bgMusic)
            bgMusic.pause()
    }
}

export default Music