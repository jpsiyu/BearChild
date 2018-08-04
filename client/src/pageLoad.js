import { Indicator } from './indicator'
import tool from './tool'
import macro from './macro'
import Page from './page'

class PageLoad extends Page {
    constructor() {
        super()
        this.load = new Indicator('Loading  ', this.loadingBarPos.bind(this))
        this.laodTime = 3
        this.pass = 0
        this.end = false
    }

    loadingBarPos(){
        const w = tool.gameWidth()
        const h = tool.gameHeight()
        const size = tool.viewUnit()
        return {
            x: w / 3,
            y: h / 2,
            width: 4 * size,
            height: size / 3,
        }
    }

    update(elapsed) {
        if(this.end) return
        if (this.pass < this.laodTime) {
            this.pass += elapsed
        }else{
            this.end = true
            window.g.gameEventListener.dispatch(macro.EventLoad)
        }
        this.load.update(elapsed)
    }

    draw(context) {
        this.load.draw(context, this.pass, this.laodTime)
    }
}

export default PageLoad