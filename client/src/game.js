import drawing from './drawing'
import Child from './child'
import Door from './door'
import Mom from './mom'
import macro from './macro'
import { Grid } from './grid'
import { NumberIndicator } from './indicator'
import tool from './tool'
import Controller from './controller'
import PageEnd from './pageEnd'
import PageStart from './pageStart'
import PageLoad from './pageLoad'

class Game {
    constructor(context) {
        this.context = context
        this.previous = undefined
        this.frame = this.frame.bind(this)
        this.fps = 0
        this.level = 1
        this.pause = false
        this.child = undefined
        this.controller = this.initController()
        this.pageEnd = this.initPageEnd()
        this.pageStart = this.initPageStart()
        this.pageLoad = this.initPageLoad()
        this.levelIndicator = new NumberIndicator('Level ', 70, 10, { pt: 12 })
        this.fpsIndicator = new NumberIndicator('fps ', 200, 10, { pt: 12, digits: 2 })
        this.loadFlag = 0

        window.requestAnimationFrame(this.frame)
    }

    startLoad() {
        window.g.gameState = macro.StateLoad
        window.g.resMgr.loadRes(() => {
            this.loadFlag++
            this.loadFinish()
        })
    }

    loadFinish() {
        if (this.loadFlag >= 2)
            this.readyForGame()
    }

    initController() {
        const controller = new Controller(this.context)
        controller.setChildHanlder(() => { return this.child })
        controller.setPageEndHandler(() => { return this.pageEnd })
        controller.setPageStartHandler(() => { return this.pageStart })
        controller.setRestartHandler(() => { this.restartGame() })
        return controller
    }

    initPageLoad() {
        const pageLoad = new PageLoad()
        pageLoad.setFinishHandler(() => {
            this.loadFlag++
            this.loadFinish()
        })
        return pageLoad
    }

    initPageEnd() {
        const pageEnd = new PageEnd()
        pageEnd.setRestartHandler(() => { this.restartGame() })
        pageEnd.setReadyHandler(() => { this.readyForGame() })
        return pageEnd
    }

    initPageStart() {
        const pageStart = new PageStart()
        pageStart.setRestartHandler(() => { this.restartGame() })
        return pageStart
    }

    readyForGame() {
        window.g.gameState = macro.StateReady
        this.level = 1
    }

    restartGame() {
        window.g.gameState = macro.StateGame
        this.level = 1
        this.level = 1
        this.resetGame()
    }

    resetGame() {
        window.g.music.playBg()
        this.grid = new Grid()

        let pos = tool.grid2coord(tool.maxRow(), 2)
        this.child = new Child(pos.x, pos.y)

        pos = tool.grid2coord(tool.maxRow(), 0)
        this.mom = new Mom(pos.x, pos.y)

        this.door = new Door(
            this.context.canvas.width - tool.gridSize(),
            tool.gridSize(),
        )

        window.g.map.reset()
    }

    levelUp() {
        window.g.gameState = macro.StateLevelUp
        this.level += 1
        this.resetGame()
        setTimeout(() => {
            window.g.gameState = macro.StateGame
        }, 2 * 1000)
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
        window.g.map.milks.forEach((milk, i) => {
            const dis = tool.distance(this.child, milk)
            if (dis < (this.child.radius + milk.radius)) {
                drink = true
                window.g.map.milks.splice(i, 1)
            }
        })
        return drink
    }

    setPause(bool) {
        this.pause = bool
        if (this.pause) this.previous = undefined
    }

    frame(timestamp) {
        if (this.pause) return
        this.previous = this.previous || timestamp
        const elapsed = (timestamp - this.previous) / 1000
        this.previous = timestamp
        this.update(elapsed)
        this.draw()
        window.requestAnimationFrame(this.frame)
    }

    update(elapsed) {
        this.fps = 1 / elapsed
        switch (window.g.gameState) {
            case macro.StateLoad:
                this.pageLoad.update(elapsed)
                break
            case macro.StateGame:
                if (this.reachDoor()) {
                    window.g.music.pauseBg()
                    window.g.gameState = macro.StateReachDoor
                    setTimeout(() => { this.levelUp() }, 2 * 1000)
                    window.g.music.win()
                    return
                }
                if (this.momCatchChild()) {
                    window.g.music.pauseBg()
                    window.g.music.lose()
                    window.g.gameState = macro.StateGameOver
                    return
                }
                if (this.childCatchMilk()) {
                    this.child.drinkMilk = true
                }
                this.child.update(elapsed)
                this.mom.update(this.child, elapsed)
                break
            case macro.StateReachDoor:
                this.child.update(elapsed)
                break
            default:
                break
        }
    }

    draw() {
        switch (window.g.gameState) {
            case macro.StateLoad:
                this.pageLoad.draw(this.context)
                break
            case macro.StateReady:
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
                this.pageStart.draw(this.context)
                break
            case macro.StateLevelUp:
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
                drawing.drawLabel(
                    this.context,
                    `Level ${this.level}`,
                    this.context.canvas.width / 2,
                    this.context.canvas.height / 2, { pt: 30, color: 'white' }
                )
                break
            default:
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
                this.grid.draw(this.context)
                window.g.map.milks.forEach(milk => {
                    milk.draw(this.context)
                })
                window.g.map.fences.forEach(fence => {
                    fence.draw(this.context)
                })
                this.mom.draw(this.context)
                this.grid.drawMask(this.context, this.child)
                this.door.draw(this.context)

                this.levelIndicator.draw(this.context, this.level)
                //this.fpsIndicator.draw(this.context, this.fps) 
                this.controller.draw(this.context)
                this.child.draw(this.context)
                this.pageEnd.draw(this.context)
                break
        }
    }
}

export default Game