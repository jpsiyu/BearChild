import Element from './element'
import drawing from './drawing'
import macro from './macro'

class Mom extends Element{
    constructor(x, y, img){
        const radius = macro.GridSize / 2
        super(x, y, radius)
        this.chaseSpeed = 50
        this.waitTime = 3
        this.waitPass = 0
        this.img = img
    }


    update(child, elapsed) { 
        if(this.waitPass < this.waitTime){
            this.waitPass += elapsed
            return
        }
        this.chase(child, elapsed)
    }

    chase(child, elapsed){
        const dy = child.y - this.y
        const dx = child.x - this.x
        const theta = Math.atan2(dy, dx)
        this.x += Math.cos(theta) * this.chaseSpeed * elapsed
        this.y += Math.sin(theta) * this.chaseSpeed * elapsed
    }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        drawing.drawImg(context, -macro.GridSize/2, -macro.GridSize/2, this.radius, this.img)
        context.restore()
    }
}

export default Mom