
class ResMgr {
    constructor() {
        this.names= [
            'door',
            'fence',
            'milk',
            'drink',
            'catched',
            'mom-run',
            'child-roll',
            'sky',
            'grassland',
            'warrior',
            'ball',
        ]
        this.images = {}
    }

    loadRes(callback){
        this.loadImgs( () => {
            //window.g.music.loadMusics(callback)
            window.g.gameAudio.loadAll(callback)
        })
    }

    loadImgs(callback) {
        let loadNum = 0
        this.names.forEach(name => {
            const img = new Image()
            const path = `${name}.png`
            img.src = path
            img.onload = () => {
                this.images[name] = img
                loadNum++
                if(loadNum === this.names.length)
                    callback()
            }
        })
    }

    getImg(name){
        return this.images[name]
    }
}

export default ResMgr