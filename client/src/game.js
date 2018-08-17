import drawing from './drawing'
import Child from './child'
import Door from './door'
import Mom from './mom'
import Rebuild from './rebuild'
import macro from './macro'
import { Grid } from './grid'
import { NumberIndicator } from './indicator'
import tool from './tool'
import Controller from './controller'
import Fence from './fence'
import Milk from './milk'
import Hole from './hole'
import Eye from './eye'
import Ball from './ball'
import Shield from './shield'

class Game {
    constructor(context) {
        this.context = context
        this.previous = undefined
        this.frame = this.frame.bind(this)
        this.fps = 0
        this.pause = false
        this.child = undefined
        this.rebuild = new Rebuild()
        this.controller = this.initController()
        this.levelIndicator = new NumberIndicator('Level ', 70, 10, { pt: 12 })
        this.fpsIndicator = new NumberIndicator('fps ', 200, 10, { pt: 12, digits: 2 })
        this.loadFlag = 0
        this.drawMask = true

        window.g.gameEventListener.register(macro.EventRestart, this, () => { this.restartGame() })
        window.g.gameEventListener.register(macro.EventReady, this, () => { this.readyForGame() })
        window.g.gameEventListener.register(macro.EventLoadFinish, this, () => { this.readyForGame() })

        window.requestAnimationFrame(this.frame)
    }

    initController() {
        const controller = new Controller(this.context)
        controller.setChildHanlder(() => { return this.child })
        return controller
    }

    readyForGame() {
        window.g.uiMgr.show(macro.UIStart)
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

    handleCollision(obj, index) {
        if (obj instanceof Milk) {
            window.g.map.milks.splice(index, 1)
            switch (this.child.mode) {
                case macro.ChildModeNormal:
                    this.child.changeMode(macro.ChildModeDrink)
                    break
                case macro.ChildModeWarrior:
                    window.g.map.createExplosion(obj.img, obj.x, obj.y)
                    break
            }
        } else if (obj instanceof Fence) {
            window.g.map.fences.splice(index, 1)
            window.g.map.createExplosion(obj.img, obj.x, obj.y)
        } else if (obj instanceof Hole) {
            this.rebuild.reset(obj)
            window.g.gameState = macro.StateRebuild
            window.g.map.holes.splice(index, 1)
        } else if (obj instanceof Ball) {
            this.child.changeMode(macro.ChildModeWarrior)
            window.g.map.balls.splice(index, 1)
        } else if (obj instanceof Eye) {
            this.drawMask = false
        } else if (obj instanceof Shield) {
            obj.holdShield(this.child)
        }
    }

    childCollisionMapObj() {
        const all = window.g.map.allDraws()
        let objList, obj
        let targetObj, targetIndex
        for (let i = 0; i < all.length; i++) {
            objList = all[i]
            for (let j = 0; j < objList.length; j++) {
                obj = objList[j]
                const dis = tool.distance(this.child, obj)
                if (dis < 1) {
                    targetObj = obj
                    targetIndex = j
                    break
                }
            }
        }
        if (targetObj) this.handleCollision(targetObj, targetIndex)
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
        this.drawMask = true
        switch (window.g.gameState) {
            case macro.StateRebuild:
                this.rebuild.update(elapsed)
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
                    window.g.uiMgr.show(macro.UIEnd)
                    return
                }
                this.childCollisionMapObj()
                window.g.map.update(elapsed)
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
    }

    draw() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        switch (window.g.gameState) {
            case macro.StateLoad:
            case macro.StateReady:
                break
            case macro.StateLevelUp:
                drawing.drawLabel(
                    this.context,
                    `Level ${window.g.gameLv}`,
                    this.context.canvas.width / 2,
                    this.context.canvas.height / 2, { pt: 30, color: 'white' }
                )
                break
            case macro.StateRebuild:
                this.grid.draw(this.context)
                window.g.map.draw(this.context)
                this.rebuild.draw(this.context)
                this.door.draw(this.context)
                break
            default:
                this.grid.draw(this.context)
                window.g.map.draw(this.context)
                if (this.drawMask) this.grid.drawMask(this.context)
                this.door.draw(this.context)

                this.levelIndicator.draw(this.context, window.g.gameLv)
                //this.fpsIndicator.draw(this.context, this.fps) 
                this.controller.draw(this.context)
                this.child.draw(this.context)
                this.mom.draw(this.context)
                break
        }
    }
}

export default Game