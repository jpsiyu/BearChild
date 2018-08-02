import { Indicator } from './indicator'
import tool from './tool'
import macro from './macro'
import Page from './page'

class PageLoad extends Page {
    constructor() {
        super()
        const w = tool.gameWidth()
        const h = tool.gameHeight()
        const size = tool.gridSize()
        this.load = new Indicator('Loading  ', w / 3, h / 2, 4 * size, size / 3)
        this.laodTime = 3
        this.pass = 0
        this.end = false
    }

    update(elapsed) {
        if(this.end) return
        if (this.pass < this.laodTime) {
            this.pass += elapsed
        }else{
            this.end = true
            window.g.gameEventListener.dispatch(macro.EventLoad)
        }
    }

    draw(context) {
        this.load.draw(context, this.pass, this.laodTime)
    }
}

export default PageLoad