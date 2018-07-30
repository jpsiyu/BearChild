import drawing from './drawing'
import macro from './macro'
import Element from './element'
import {storeState} from './store'

class Fence extends Element {
    constructor(x, y) {
        const radius = macro.GridSize/2
        super(x, y, radius)
        this.img = storeState().resMgr.getImg('fence')
    }

    update() { }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        drawing.drawImg(context, -this.radius, -this.radius, this.radius, this.img)
        context.restore()
    }
}

export default Fence