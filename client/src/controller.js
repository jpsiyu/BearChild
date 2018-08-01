import drawing from './drawing'
import macro from './macro'
import Element from './element'
import tool from './tool'
import { storeState, changeState } from './store'

class Controller extends Element {
    constructor(context) {
        const radius = tool.gridSize() * 1
        super(0, 0, radius)
        this.context = context
        this.resetPos()
        this.startGameText = 'Start Game'
        this.setEventListener()
    }

    setEventListener() {
        window.addEventListener('resize', ev => { this.resetPos() })

        window.addEventListener('keydown', ev => {
            this.keyHandler(ev.key)
        })

        this.context.canvas.addEventListener('click', event => {
            const pos = this.getMousePos(event)
            this.handleClick(pos)
        })

        this.context.canvas.addEventListener('touchstart', event => {
            const pos = this.getTouchPos(event)
            this.handleClick(pos)
            event.preventDefault()
        })
    }

    setChildHanlder(childHandler) {
        this.childHandler = childHandler
    }

    setRestartHandler(restartHandler) {
        this.restartHandler = restartHandler
    }

    setPageEndHandler(pageEndHandler) {
        this.pageEndHandler = pageEndHandler
    }

    resetPos() {
        this.radius = tool.gridSize() * 1
        this.posArrowUp = tool.grid2coord(tool.maxRow() - 2, tool.maxCol() - 2)
        this.posArrowRight = tool.grid2coord(tool.maxRow() - 0.5, tool.maxCol() - 0.5)
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

    drawArrow(context, pos, arrow, options = {}) {
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

    startGameClick() {
        this.restartHandler()
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
                this.pageEndHandler().handleClick(pos)
                break
            case macro.StateReady:
                if (pos.x > this.rectInfo.x && pos.x < this.rectInfo.x + this.rectInfo.w &&
                    pos.y > this.rectInfo.y && pos.y < this.rectInfo.y + this.rectInfo.h)
                    this.startGameClick()
                break
        }
    }

    getMousePos(event) {
        const rect = this.context.canvas.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    getTouchPos(event) {
        const rect = this.context.canvas.getBoundingClientRect()
        return {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top
        }
    }

    keyHandler(key) {
        switch (storeState().gameState) {
            case macro.StateGame:
                const c = this.childHandler()
                c.move(this.context, key)
                break
            case macro.StateGameOver:
                if (key === ' ')
                    this.restartHandler()
                break
        }
    }
}

export default Controller