import drawing from './drawing'
import Child from './child'
import Door from './door'
import Mom from './mom'
import macro from './macro'
import { Grid } from './grid'
import { NumberIndicator } from './indicator'
import tool from './tool'
import Milk from './milk'
import Resource from './resource'

class Game {
    constructor(context) {
        this.context = context
        this.previous = undefined
        this.frame = this.frame.bind(this)
        this.level = 1
        this.milks = []
        this.res = new Resource()

        this.context.canvas.focus()
        window.addEventListener('keydown', ev => {
            this.keyHandler(ev.key)
        })

        this.levelIndicator = new NumberIndicator(
            'Level ', 70, 10, { pt: 12 }
        )

        this.res.loadImgs( () => {
            this.resetGame()
            window.requestAnimationFrame(this.frame)
        })
    }

    restartGame() {
        this.level = 1
        this.resetGame()
    }

    resetGame() {
        this.gameOver = false
        this.grid = new Grid()

        let pos = tool.grid2coord(tool.maxRow(), 2)
        this.child = new Child(pos.x, pos.y, this.res.images['girl'])

        pos = tool.grid2coord(tool.maxRow(), 0)
        this.mom = new Mom(pos.x, pos.y, this.res.images['mom'])

        this.door = new Door(
            this.context.canvas.width - macro.GridSize,
            macro.GridSize,
            this.res.images['door']
        )

        this.randomMilk()
    }

    randomMilk() {
        this.milks = []
        const posList = []
        const inLimit = (row, col) => {
            return col > 2 && col < tool.maxCol() - 2
        }
        while (posList.length < 8) {
            const row = Math.floor(Math.random() * tool.maxRow())
            const col = Math.floor(Math.random() * tool.maxCol())
            const g = [row, col]
            if (!posList.includes(g) && inLimit(row, col)) {
                posList.push(g)
                const pos = tool.grid2coord(row, col)
                this.milks.push(new Milk(pos.x, pos.y, this.res.images['milk']))
            }
        }
    }

    levelUp() {
        this.level += 1
        this.resetGame()
    }

    reachDoor() {
        const dis = tool.distance(this.child, this.door)
        return dis < (this.child.radius + this.door.radius)
    }

    momCatchChild() {
        const dis = tool.distance(this.child, this.mom)
        return dis < (this.child.radius + this.mom.radius)
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
        if (this.gameOver) return
        if (this.reachDoor()) {
            this.levelUp()
            return
        }
        if (this.momCatchChild()) {
            this.gameOver = true
            return
        }
        if (this.childCatchMilk()) {
            this.child.drinkMilk = true
        }
        this.mom.update(this.child, elapsed)
        this.child.update(elapsed)
    }

    draw() {
        if (this.gameOver) {
            this.drawGameOver()
            return
        }
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        this.grid.draw(this.context, this.child)
        this.child.draw(this.context)
        this.mom.draw(this.context)
        this.door.draw(this.context)
        this.milks.forEach(milk => {
            milk.draw(this.context)
        })

        this.levelIndicator.draw(this.context, this.level)
    }

    drawGameOver() {
        const w = this.context.canvas.width
        const h = this.context.canvas.height
        drawing.drawLabel(this.context, 'Game Over', w / 2, h / 2, { pt: 14 })
        drawing.drawLabel(this.context, 'Press Space To Restart', w / 2, h / 2 + 15, { pt: 10 })

    }

    keyHandler(keyCode) {
        switch (keyCode) {
            case ' ':
                if (this.gameOver) this.restartGame()
                break
        }
        if (!this.gameOver)
            this.child.move(this.context, keyCode)
    }
}

export default Game