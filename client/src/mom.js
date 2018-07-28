import Element from './element'
import drawing from './drawing'
import macro from './macro'
import gameMgr from './gameMgr'

class Mom extends Element {
    constructor(x, y) {
        const radius = macro.GridSize / 2
        super(x, y, radius)
        this.chaseSpeed = 100
        this.waitTime = 1
        this.waitPass = 0
        this.img = gameMgr.res.images['mom']
    }

    update(child, elapsed) {
        if (this.waitPass < this.waitTime) {
            this.waitPass += elapsed
            return
        }
        this.chase(child, elapsed)
    }

    chase(child, elapsed) {
        const dy = child.y - this.y
        const dx = child.x - this.x
        const theta = Math.atan2(dy, dx)
        this.x += Math.cos(theta) * this.chaseSpeed * elapsed
        this.y += Math.sin(theta) * this.chaseSpeed * elapsed
    }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        if (gameMgr.state == macro.StateGameOver) {
            this.radius = macro.GridSize
            this.img = gameMgr.res.images['catched']
        } else {
            this.radius = macro.GridSize / 2
            this.img = gameMgr.res.images['mom']
        }
        drawing.drawImg(context, -this.radius, -this.radius, this.radius, this.img)
        context.restore()
    }
}

export default Mom