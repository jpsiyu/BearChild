import drawing from './drawing'
import Child from './child'
import Door from './door'
import Mom from './mom'
import macro from './macro'
import { Grid } from './grid'
import { NumberIndicator } from './indicator'
import tool from './tool'
import Milk from './milk'
import gameMgr from './gameMgr'

class Game {
    constructor(context) {
        this.context = context
        this.previous = undefined
        this.frame = this.frame.bind(this)
        this.level = 1
        this.milks = []

        this.context.canvas.focus()
        window.addEventListener('keydown', ev => {
            this.keyHandler(ev.key)
        })

        this.levelIndicator = new NumberIndicator(
            'Level ', 70, 10, { pt: 12 }
        )

        gameMgr.res.loadImgs(() => {
            this.resetGame()
            window.requestAnimationFrame(this.frame)
        })
    }

    restartGame() {
        gameMgr.state = macro.StateGame
        this.level = 1
        this.resetGame()
    }

    resetGame() {
        this.grid = new Grid()

        let pos = tool.grid2coord(tool.maxRow(), 2)
        this.child = new Child(pos.x, pos.y)

        pos = tool.grid2coord(tool.maxRow(), 0)
        this.mom = new Mom(pos.x, pos.y)

        this.door = new Door(
            this.context.canvas.width - macro.GridSize,
            macro.GridSize,
        )

        this.randomMilk()
    }

    randomMilk() {
        this.milks = []
        const posList = []
        const inLimit = (row, col) => {
            return col > 2 && col < tool.maxCol() - 2
        }
        while (posList.length < 14) {
            const row = Math.round(Math.random() * tool.maxRow())
            const col = Math.round(Math.random() * tool.maxCol())
            const g = [row, col]
            if (!posList.includes(g) && inLimit(row, col)) {
                posList.push(g)
                const pos = tool.grid2coord(row, col)
                this.milks.push(new Milk(pos.x, pos.y))
            }
        }
    }

    levelUp() {
        gameMgr.state = macro.StateLevelUp
        this.level += 1
        this.resetGame()
        setTimeout(() => { gameMgr.state = macro.StateGame }, 2 * 1000)
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
        this.milks.forEach((milk, i) => {
            const dis = tool.distance(this.child, milk)
            if (dis < (this.child.radius + milk.radius)) {
                drink = true
                this.milks.splice(i, 1)
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
        switch (gameMgr.state) {
            case macro.StateGame:
                if (this.reachDoor()) {
                    gameMgr.state = macro.StateReachDoor
                    setTimeout(() => { this.levelUp() }, 2 * 1000)
                    return
                }
                if (this.momCatchChild()) {
                    gameMgr.state = macro.StateGameOver
                    return
                }
                if (this.childCatchMilk()) {
                    this.child.drinkMilk = true
                }
                this.mom.update(this.child, elapsed)
                this.child.update(elapsed)
                break
            case macro.StateReachDoor:
            case macro.StateGameOver:
            case macro.StateLevelUp:
                break
        }
    }

    draw() {
        switch (gameMgr.state) {
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
                this.milks.forEach(milk => {
                    milk.draw(this.context)
                })
                this.mom.draw(this.context)
                this.grid.drawMask(this.context, this.child)
                this.door.draw(this.context)

                this.levelIndicator.draw(this.context, this.level)
                if (gameMgr.state !== macro.StateGameOver) this.child.draw(this.context)
                if (gameMgr.state === macro.StateGameOver) this.drawGameOver()
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
        switch (gameMgr.state) {
            case macro.StateGame:
                this.child.move(this.context, key)
                break
            case macro.StateGameOver:
                if (key === ' ')
                    this.restartGame()
                break

        }
    }
}

export default Game