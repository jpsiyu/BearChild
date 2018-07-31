import drawing from './drawing'
import macro from './macro'
import Element from './element'
import tool from './tool'
import { storeState } from './store'

class Controller extends Element {
    constructor(x, y, childHandler, restartHandler) {
        const radius = tool.gridSize() * 1
        super(x, y, radius)
        this.childHandler = childHandler
        this.restartHandler = restartHandler
        this.posArrowUp = tool.grid2coord(tool.maxRow() - 2, tool.maxCol() - 2)
        this.posArrowRight = tool.grid2coord(tool.maxRow() - 0.5, tool.maxCol() - 0.5)
        this.posArrowReload = tool.grid2coord(tool.maxRow() - 1, tool.maxCol() - 1)
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