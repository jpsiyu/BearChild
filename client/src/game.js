import drawing from './drawing'
import Child from './child'
import Door from './door'
import Mom from './mom'
import macro from './macro'
import { Grid } from './grid'
import { NumberIndicator } from './indicator'
import tool from './tool'
import { storeState, changeState } from './store'
import Controller from './controller'

class Game {
    constructor(context) {
        this.context = context
        this.previous = undefined
        this.frame = this.frame.bind(this)
        this.fps = 0
        this.level = 1
        this.pause = false
        this.child = undefined

        this.context.canvas.focus()
        window.addEventListener('keydown', ev => {
            this.keyHandler(ev.key)
        })

        let pos = tool.grid2coord(tool.maxRow(), tool.maxCol())
        this.controller = new Controller(pos.x, pos.y, () => { return this.child }, () => { this.restartGame() })
        this.context.canvas.addEventListener('click', event => {
            const pos = this.getMousePos(event)
            this.controller.handleClick(pos)
        })

        this.context.canvas.addEventListener('touchstart', event => {
            const pos = this.getTouchPos(event)
            this.controller.handleClick(pos)
            event.preventDefault()
        })

        this.levelIndicator = new NumberIndicator(
            'Level ', 70, 10, { pt: 12 }
        )

        this.fpsIndicator = new NumberIndicator(
            'fps ', 200, 10, { pt: 12, digits: 2 }
        )


        storeState().resMgr.loadRes(() => {
            this.resetGame()
            window.requestAnimationFrame(this.frame)
        })

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause = true
                storeState().music.pauseBg()
            }
            else {
                this.pause = false
                storeState().music.playBg()
            }
        })
    }

    restartGame() {
        changeState(macro.StateGame)
        this.level = 1
        this.resetGame()
    }

    resetGame() {
        storeState().music.playBg()
        this.grid = new Grid()

        let pos = tool.grid2coord(tool.maxRow(), 2)
        this.child = new Child(pos.x, pos.y)

        pos = tool.grid2coord(tool.maxRow(), 0)
        this.mom = new Mom(pos.x, pos.y)

        this.door = new Door(
            this.context.canvas.width - tool.gridSize(),
            tool.gridSize(),
        )

        pos = tool.grid2coord(tool.maxRow(), 4)

        storeState().map.reset()
    }

    levelUp() {
        changeState(macro.StateLevelUp)
        this.level += 1
        this.resetGame()
        setTimeout(() => { changeState(macro.StateGame) }, 2 * 1000)
    }

    reachDoor() {
        const dis = tool.distance(this.child, this.door)
        return dis < (this.child.radius + this.door.radius)
    }

    momCatchChild() {
        const dis = tool.distance(this.child, this.mom)
        return dis < (this.mom.radius)
    }

    childCatchMilk() {
        let drink = false
        storeState().map.milks.forEach((milk, i) => {
            const dis = tool.distance(this.child, milk)
            if (dis < (this.child.radius + milk.radius)) {
                drink = true
                storeState().map.milks.splice(i, 1)
            }
        })
        return drink
    }

    frame(timestamp) {
        this.previous = this.previous || timestamp
        const elapsed = (timestamp - this.previous) / 1000
        this.previous = timestamp
        this.update(elapsed)
        this.draw()
        window.requestAnimationFrame(this.frame)
    }

    update(elapsed) {
        if (this.pause) return
        this.fps = 1 / elapsed
        switch (storeState().gameState) {
            case macro.StateGame:
                if (this.reachDoor()) {
                    changeState(macro.StateReachDoor)
                    setTimeout(() => { this.levelUp() }, 2 * 1000)
                    return
                }
                if (this.momCatchChild()) {
                    changeState(macro.StateGameOver)
                    return
                }
                if (this.childCatchMilk()) {
                    this.child.drinkMilk = true
                }
                this.mom.update(this.child, elapsed)
                this.child.update(elapsed)
                break
            case macro.StateReachDoor:
                this.child.update(elapsed)
                break
            case macro.StateGameOver:
            case macro.StateLevelUp:
                break
        }
    }

    draw() {
        if (this.pause) return
        switch (storeState().gameState) {
            case macro.StateLevelUp:
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
                drawing.drawLabel(
                    this.context,
                    `Level ${this.level}`,
                    this.context.canvas.width / 2,
                    this.context.canvas.height / 2, { pt: 30, color: 'white' }
                )
                break
            case macro.StateGameOver:
            case macro.StateGame:
            case macro.StateReachDoor:
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
                this.grid.draw(this.context, this.child)
                storeState().map.milks.forEach(milk => {
                    milk.draw(this.context)
                })
                storeState().map.fences.forEach(fence => {
                    fence.draw(this.context)
                })
                this.mom.draw(this.context)
                this.grid.drawMask(this.context, this.child)
                this.door.draw(this.context)

                this.levelIndicator.draw(this.context, this.level)
                this.controller.draw(this.context)
                //this.fpsIndicator.draw(this.context, this.fps) 
                this.child.draw(this.context)
                if (storeState().gameState === macro.StateGameOver) this.drawGameOver()
                break
        }
    }

    drawGameOver() {
        const w = this.context.canvas.width
        const h = this.context.canvas.height
        drawing.drawLabel(this.context, 'Game Over', w / 2, h / 2, { pt: 30 })
        drawing.drawLabel(this.context, 'Press Space To Restart', w / 2, h / 2 + 30, { pt: 16 })

    }

    keyHandler(key) {
        switch (storeState().gameState) {
            case macro.StateGame:
                this.child.move(this.context, key)
                break
            case macro.StateGameOver:
                if (key === ' ')
                    this.restartGame()
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
}

export default Game