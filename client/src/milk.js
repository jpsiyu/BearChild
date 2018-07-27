import drawing from './drawing'
import macro from './macro'
import Element from './element'

class Milk extends Element {
    constructor(x, y, img) {
        const radius = macro.GridSize / 2
        super(x, y, radius)
        this.img = img
    }

    update() { }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        drawing.drawImg(context, -macro.GridSize/2, -macro.GridSize/2, this.radius, this.img)
        context.restore()
    }

}

export default Milk