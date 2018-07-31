import drawing from './drawing'
import macro from './macro'
import Element from './element'
import tool from './tool'
import { storeState } from './store'

class Controller extends Element {
    constructor(x, y, childHandler, restartHandler) {
        const radius = macro.GridSize / 2
        super(x, y, radius)
        this.childHandler = childHandler
        this.restartHandler = restartHandler
        this.posArrowUp = tool.grid2coord(tool.maxRow() - 1, tool.maxCol())
        this.posArrowRight = tool.grid2coord(tool.maxRow(), tool.maxCol())
        this.posArrowReload = tool.grid2coord(tool.maxRow(), tool.maxCol())
    }

    update() { }

    draw(context) {
        switch (storeState().gameState) {
            case macro.StateGameOver:
                this.drawArrow(context, this.posArrowReload, '↺')
                break
            case macro.StateGame:
                this.drawArrow(context, this.posArrowUp, '↑')
                this.drawArrow(context, this.posArrowRight, '→')
                break
        }
    }

    drawArrow(context, pos, arrow) {
        context.save()
        context.translate(pos.x, pos.y)
        drawing.drawButton(context, this.radius, arrow)
        context.restore()
    }

    arrowRightClick() {
        const c = this.childHandler()
        if (c) {
            c.moveRight()
        }
    }

    arrowUpClick() {
        const c = this.childHandler()
        if (c) {
            c.moveUp()
        }
    }

    arrowReloadClick() {
        this.restartHandler()
    }

    handleClick(pos) {
        let distance
        switch (storeState().gameState) {
            case macro.StateGame:
                distance = tool.distancePos(pos, this.posArrowUp)
                if (distance < this.radius) this.arrowUpClick()

                distance = tool.distancePos(pos, this.posArrowRight)
                if (distance < this.radius) this.arrowRightClick()
                break
            case macro.StateGameOver:
                distance = tool.distancePos(pos, this.posArrowReload)
                if (distance < this.radius) this.arrowReloadClick()
                break
        }
    }

}

export default Controller