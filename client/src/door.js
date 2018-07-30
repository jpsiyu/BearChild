import drawing from './drawing'
import macro from './macro'
import Element from './element'
import {storeState} from './store'

class Door extends Element {
    constructor(x, y) {
        const radius = macro.GridSize
        super(x, y, radius)
        this.img = storeState().resMgr.getImg('door')
    }

    update() { }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        drawing.drawImg(context, -macro.GridSize, -macro.GridSize, this.radius, this.img)
        context.restore()
    }

}

export default Door