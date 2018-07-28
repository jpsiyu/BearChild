import drawing from './drawing'
import macro from './macro'
import Element from './element'
import store from './store'
import { timingSafeEqual } from 'crypto';

class Child extends Element {
    constructor(x, y) {
        const radius = macro.GridSize / 2
        super(x, y, radius)
        this.img = store.getImg('child')

        this.drinkMilk = false
        this.drinkMilkTime = 2
        this.pass = 0
        this.angle = 0
        this.jumpPos = undefined
    }


    update(elapsed) {
        switch (store.gameState()) {
            case macro.StateGame:
                if (this.drinkMilk) {
                    if (this.pass < this.drinkMilkTime) {
                        this.pass += elapsed
                        this.angle = -0.25 * Math.PI * Math.sin(this.pass * 8)
                    }
                    else {
                        this.drinkMilk = false
                        this.pass = 0
                    }
                } else {
                    this.angle = 0
                }
                break
            case macro.StateReachDoor:
                this.jumpPos = this.jumpPos || this.y
                this.pass += elapsed
                this.y = this.jumpPos + 10*Math.sin(this.pass * 20)
                break
        }
    }

    draw(context) {
        switch (store.gameState()) {
            case macro.StateGameOver:
                break
            case macro.StateGame:
            case macro.StateReachDoor:
                context.save()
                context.translate(this.x, this.y)
                context.rotate(this.angle)
                this.img = this.drinkMilk ? store.getImg('drink') : store.getImg('child')
                drawing.drawImg(context, -macro.GridSize / 2, -macro.GridSize / 2, this.radius, this.img)
                context.restore()
                break
        }
    }

    move(context, keyCode) {
        if (this.drinkMilk) return
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