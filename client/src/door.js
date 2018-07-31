import drawing from './drawing'
import tool from './tool'
import Element from './element'
import {storeState} from './store'

class Door extends Element {
    constructor(x, y) {
        const radius = tool.gridSize()
        super(x, y, radius)
        this.img = storeState().resMgr.getImg('door')
    }

    update() { }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        drawing.drawImg(context, -tool.gridSize(), -tool.gridSize(), this.radius, this.img)
        context.restore()
    }

}

export default Door