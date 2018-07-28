class Music{
    constructor(){
        this.bg = new Audio('bg.mp3')
        this.bg.loop = true
    }

    playBg(){
        this.bg.play()
    }

    pauseBg(){
        this.bg.pause()
    }
}

export default Music