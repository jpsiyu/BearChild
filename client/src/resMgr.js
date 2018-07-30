import {storeState} from './store'

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
        ]
        this.images = {}
    }

    loadRes(callback){
        this.loadImgs( () => {
            storeState().music.loadMusics(callback)
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