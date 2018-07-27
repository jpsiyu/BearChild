import drawing from './drawing'
import macro from './macro'
import Element from './element'

class Child extends Element {
    constructor(x, y, img) {
        const radius = macro.GridSize / 2
        super(x, y, radius)
        this.img = img

        this.drinkMilk = false
        this.drinkMilkTime = 2
        this.pass = 0
    }


    update(elapsed) { 
        if(this.drinkMilk){
            if(this.pass < this.drinkMilkTime)
                this.pass += elapsed
            else{
                this.drinkMilk = false
                this.pass = 0
            }
        }
    }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        drawing.drawImg(context, -macro.GridSize/2, -macro.GridSize/2, this.radius, this.img)
        context.restore()
    }

    move(context, keyCode) {
        if(this.drinkMilk) return
        switch (keyCode) {
            case 'ArrowUp':
                this.y -= macro.GridSize
                break
            case 'ArrowDown':
                //this.y += macro.GridSize
                break
            case 'ArrowLeft':
                //this.x -= macro.GridSize
                break
            case 'ArrowRight':
                this.x += macro.GridSize
                break
        }
        this.moveLimit(context)
    }

    moveLimit(context) {
        const w = context.canvas.width
        const h = context.canvas.height
        const halfGrid = macro.GridSize / 2
        this.x = Math.min(this.x, w - halfGrid)
        this.x = Math.max(this.x, 0 + halfGrid)
        this.y = Math.min(this.y, h - halfGrid)
        this.y = Math.max(this.y, 0 + halfGrid)
    }
}

export default Child