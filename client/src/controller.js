import drawing from './drawing'
import macro from './macro'
import Element from './element'
import tool from './tool'

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

    resetPos() {
        this.radius = tool.gridSize() * 1
        this.posArrowUp = tool.grid2coord(tool.maxRow() - 2, tool.maxCol() - 2)
        this.posArrowRight = tool.grid2coord(tool.maxRow() - 0.5, tool.maxCol() - 0.5)
    }

    update(elapsed) { 
        this.resetPos()
    }

    draw(context) {
        switch (window.g.gameState) {
            case macro.StateGame:
                this.drawArrow(context, this.posArrowUp, '↑')
                this.drawArrow(context, this.posArrowRight, '→')
                break
        }
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


    handleClick(pos) {
        let distance
        switch (window.g.gameState) {
            case macro.StateGame:
                distance = tool.distancePos(pos, this.posArrowUp)
                if (distance < this.radius) this.arrowUpClick()

                distance = tool.distancePos(pos, this.posArrowRight)
                if (distance < this.radius) this.arrowRightClick()
                break
        }
        window.g.gameEventListener.dispatch(macro.EventClick, pos)
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
        switch (window.g.gameState) {
            case macro.StateGame:
                const c = this.childHandler()
                c.move(this.context, key)
                break
            case macro.StateGameOver:
                if (key === ' ')
                    window.g.gameEventListener.dispatch(macro.EventRestart)
                break
        }
    }
}

export default Controller