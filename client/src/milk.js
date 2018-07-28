import drawing from './drawing'
import macro from './macro'
import Element from './element'
import gameMgr from './gameMgr'

class Milk extends Element {
    constructor(x, y) {
        const radius = macro.GridSize / 3
        super(x, y, radius)
        this.img = gameMgr.res.images['milk']
    }

    update() { }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        drawing.drawImg(context, -this.radius, -this.radius, this.radius, this.img)
        context.restore()
    }

}

export default Milk