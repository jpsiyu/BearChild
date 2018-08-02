import drawing from './drawing'
import macro from './macro'
import Element from './element'
import Sprite from './sprite'
import tool from './tool'

class Child extends Element {
    constructor(x, y) {
        const radius = tool.gridSize() / 2
        super(x, y, radius)
        this.sprite = new Sprite(2, 2, window.g.resMgr.getImg('child-roll'), { frameUpdateTime: 1 })

        this.drinkMilk = false
        this.drinkMilkTime = 2
        this.pass = 0
        this.angle = 0
        this.jumpPos = undefined
    }


    update(elapsed) {
        switch (window.g.gameState) {
            case macro.StateGame:
                if (this.drinkMilk) {
                    if (this.pass < this.drinkMilkTime) {
                        this.pass += elapsed
                        this.angle = -0.05 * Math.PI * Math.sin(this.pass * 8)
                    }
                    else {
                        this.drinkMilk = false
                        this.pass = 0
                    }
                } else {
                    this.angle = 0
                }
                this.sprite.update(elapsed)
                break
            case macro.StateReachDoor:
                this.jumpPos = this.jumpPos || this.y
                this.pass += elapsed
                this.y = this.jumpPos + 10 * Math.sin(this.pass * 20)
                break
        }
    }

    draw(context) {
        switch (window.g.gameState) {
            case macro.StateGameOver:
                break
            case macro.StateGame:
            case macro.StateReachDoor:
                context.save()
                context.translate(this.x, this.y)
                if (this.drinkMilk) {
                    context.rotate(this.angle)
                    this.img = window.g.resMgr.getImg('drink')
                    drawing.drawImg(context, -tool.gridSize()/ 2, -tool.gridSize()/ 2, this.radius, this.img)

                } else {
                    this.sprite.draw(context)
                }
                context.restore()
                break
        }
    }

    move(context, keyCode) {
        switch (keyCode) {
            case 'ArrowUp':
                this.moveUp()
                break
            case 'ArrowRight':
                this.moveRight()
                break
        }
    }

    moveRight(context) {
        if (this.drinkMilk) return
        if (!this.checkPosInFense({ x: this.x + tool.gridSize(), y: this.y }))
            this.x += tool.gridSize()
        this.moveLimit(context)
    }

    moveUp() {
        if (this.drinkMilk) return
        if (!this.checkPosInFense({ x: this.x, y: this.y - tool.gridSize()}))
            this.y -= tool.gridSize()
        this.moveLimit()
    }

    checkPosInFense(pos) {
        let inFense = false
        window.g.map.fences.forEach(fence => {
            if (tool.distancePos(pos, fence.pos()) < fence.radius)
                inFense = true
        })
        return inFense
    }

    moveLimit() {
        const w = tool.gameWidth()
        const h = tool.gameHeight()
        const halfGrid = tool.gridSize() / 2
        this.x = Math.min(this.x, w - halfGrid)
        this.x = Math.max(this.x, 0 + halfGrid)
        this.y = Math.min(this.y, h - halfGrid)
        this.y = Math.max(this.y, 0 + halfGrid)
    }
}

export default Child