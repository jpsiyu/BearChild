import drawing from './drawing'
import tool from './tool'
import Element from './element'

class Ball extends Element {
    constructor(x, y) {
        const radius = tool.gridSize() / 3
        super(x, y, radius)
        this.img = window.g.resMgr.getImg('ball')
    }

    update() { }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        drawing.drawImg(context, -this.radius, -this.radius, this.radius, this.img)
        context.restore()
    }

}

export default Ball