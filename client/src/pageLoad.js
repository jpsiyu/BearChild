import { Indicator } from './indicator'
import tool from './tool'

class PageLoad {
    constructor() {
        const w = tool.gameWidth()
        const h = tool.gameHeight()
        const size = tool.gridSize()
        this.load = new Indicator('Loading  ', w / 3, h / 2, 4 * size, size / 3)
        this.laodTime = 3
        this.pass = 0
        this.end = false
    }
    setFinishHandler(handler) {
        this.finishHandler = handler
    }

    update(elapsed) {
        if(this.end) return
        if (this.pass < this.laodTime) {
            this.pass += elapsed
        }else{
            this.end = true
            this.finishHandler()
        }
    }

    draw(context) {
        this.load.draw(context, this.pass, this.laodTime)
    }
}

export default PageLoad