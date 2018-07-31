import drawing from './drawing'
import macro from './macro'
import Element from './element'
import tool from './tool'
import { storeState, changeState } from './store'

class Controller extends Element {
    constructor(childHandler, restartHandler) {
        const radius = tool.gridSize() * 1
        super(0, 0, radius)
        this.childHandler = childHandler
        this.restartHandler = restartHandler
        this.resetPos()
        this.startGameText = 'Start Game'
        window.addEventListener('resize', ev => { this.resetPos() })
    }

    resetPos() {
        this.posArrowUp = tool.grid2coord(tool.maxRow() - 2, tool.maxCol() - 2)
        this.posArrowRight = tool.grid2coord(tool.maxRow() - 0.5, tool.maxCol() - 0.5)
        this.posArrowReload = tool.grid2coord(tool.maxRow() / 2, tool.maxCol() - 2)
        this.gameTextInfo = {
            text: 'Start Game',
            pt: 20,
            color: 'white',
        }
        this.rectInfo = {
            x: tool.gameWidth() / 2 - this.gameTextInfo.text.length * this.gameTextInfo.pt / 2,
            y: tool.gameHeight() / 2 - 1.5 * this.gameTextInfo.pt,
            w: this.gameTextInfo.text.length * this.gameTextInfo.pt,
            h: 2 * this.gameTextInfo.pt,
        }
    }

    update() { }

    draw(context) {
        switch (storeState().gameState) {
            case macro.StateGameOver:
                this.drawArrow(context, this.posArrowReload, '↺', {color : 'rgba(255, 245, 215, 0.8)'})
                break
            case macro.StateGame:
                this.drawArrow(context, this.posArrowUp, '↑')
                this.drawArrow(context, this.posArrowRight, '→')
                break
            case macro.StateReady:
                this.drawStart(context)
                break
        }
    }

    drawStart(context) {
        const x = tool.gameWidth() / 2
        const y = tool.gameHeight() / 2
        context.save()
        drawing.drawLabel(context, this.gameTextInfo.text, x, y, { color: this.gameTextInfo.color, pt: this.gameTextInfo.pt })

        context.beginPath()
        context.strokeStyle = this.gameTextInfo.color
        context.rect(this.rectInfo.x, this.rectInfo.y, this.rectInfo.w, this.rectInfo.h)
        context.stroke()
        context.restore()
    }

    drawArrow(context, pos, arrow, options={}) {
        context.save()
        context.translate(pos.x, pos.y)
        drawing.drawButton(context, this.radius, arrow, options)
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

    startGameClick() {
        changeState(macro.StateGame)
        storeState().music.activeAllMusic()
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
            case macro.StateReady:
                if (pos.x > this.rectInfo.x && pos.x < this.rectInfo.x + this.rectInfo.w &&
                    pos.y > this.rectInfo.y && pos.y < this.rectInfo.y + this.rectInfo.h)
                    this.startGameClick()
                break
        }
    }

}

export default Controller