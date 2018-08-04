import drawing from './drawing'
import Child from './child'
import Door from './door'
import Mom from './mom'
import macro from './macro'
import { Grid } from './grid'
import { NumberIndicator } from './indicator'
import tool from './tool'
import Controller from './controller'

class Game {
    constructor(context) {
        this.context = context
        this.previous = undefined
        this.frame = this.frame.bind(this)
        this.fps = 0
        this.pause = false
        this.child = undefined
        this.controller = this.initController()
        this.levelIndicator = new NumberIndicator('Level ', 70, 10, { pt: 12 })
        this.fpsIndicator = new NumberIndicator('fps ', 200, 10, { pt: 12, digits: 2 })
        this.loadFlag = 0

        window.g.gameEventListener.register(macro.EventRestart, this, () => { this.restartGame() })
        window.g.gameEventListener.register(macro.EventReady, this, () => { this.readyForGame() })
        window.g.gameEventListener.register(macro.EventLoadFinish, this, () => { this.loadFinish() })

        window.requestAnimationFrame(this.frame)
    }

    startLoad() {
        window.g.gameState = macro.StateLoad
        window.g.resMgr.loadRes(() => {
            this.loadFinish()
        })
    }

    loadFinish() {
        this.loadFlag++
        console.log('load finish', this.loadFlag)
        if (this.loadFlag >= 2)
            this.readyForGame()
    }

    initController() {
        const controller = new Controller(this.context)
        controller.setChildHanlder(() => { return this.child })
        return controller
    }

    readyForGame() {
        window.g.pageMgr.hide('PageLoad')
        window.g.pageMgr.show('PageStart')
        window.g.gameState = macro.StateReady
        window.g.gameLv = 1
    }

    restartGame() {
        window.g.gameState = macro.StateGame
        window.g.gameLv = 1
        this.resetGame()
    }

    resetGame() {
        window.g.gameAudio.play('bg.mp3')
        window.g.map.reset()

        this.grid = new Grid()
        let pos = tool.grid2coord(tool.maxRow(), 2)
        this.child = new Child(pos.x, pos.y)
        pos = tool.grid2coord(tool.maxRow(), 0)
        this.mom = new Mom(pos.x, pos.y)
        this.door = new Door(
            this.context.canvas.width - tool.gridSize(),
            tool.gridSize(),
        )
    }

    levelUp() {
        window.g.gameState = macro.StateLevelUp
        window.g.gameLv += 1
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
                break
            case macro.StateGame:
                if (this.reachDoor()) {
                    window.g.gameAudio.pause('bg.mp3')
                    window.g.gameState = macro.StateReachDoor
                    setTimeout(() => { this.levelUp() }, 2 * 1000)
                    window.g.gameAudio.play('win.mp3')
                    return
                }
                if (this.momCatchChild()) {
                    window.g.gameAudio.pause('bg.mp3')
                    window.g.gameAudio.play('lose.mp3')
                    window.g.gameState = macro.StateGameOver
                    window.g.pageMgr.show('PageEnd')
                    return
                }
                if (this.childCatchMilk()) {
                    this.child.drinkMilk = true
                }
                this.child.update(elapsed)
                this.mom.update(this.child, elapsed)
                this.controller.update(elapsed)
                this.grid.update(elapsed, this.child)
                break
            case macro.StateReachDoor:
                this.child.update(elapsed)
                break
            default:
                break
        }
        window.g.pageMgr.update(elapsed)
    }

    draw() {
        switch (window.g.gameState) {
            case macro.StateLoad:
                break
            case macro.StateReady:
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
                break
            case macro.StateLevelUp:
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
                drawing.drawLabel(
                    this.context,
                    `Level ${window.g.gameLv}`,
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
                this.grid.drawMask(this.context)
                this.door.draw(this.context)

                this.levelIndicator.draw(this.context, window.g.gameLv)
                //this.fpsIndicator.draw(this.context, this.fps) 
                this.controller.draw(this.context)
                this.child.draw(this.context)
                break
        }
        window.g.pageMgr.draw(this.context)
    }
}

export default Game