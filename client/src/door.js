import drawing from './drawing'
import macro from './macro'
import Element from './element'

class Door extends Element {
    constructor(x, y, img) {
        const radius = macro.GridSize
        super(x, y, radius)
        this.img = img
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