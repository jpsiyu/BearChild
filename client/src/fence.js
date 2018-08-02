import drawing from './drawing'
import tool from './tool'
import Element from './element'

class Fence extends Element {
    constructor(x, y) {
        const radius = tool.gridSize()/2
        super(x, y, radius)
        this.img = window.g.resMgr.getImg('fence')
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