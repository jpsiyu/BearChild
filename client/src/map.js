import Milk from './milk'
import Ball from './ball'
import Fence from './fence'
import Hole from './hole'
import Explosion from './explosion'
import tool from './tool'
import gameConfig from './gameConfig'

class Map {
    constructor() {
        this.milks = []
        this.fences = []
        this.balls = []
        this.posList = []
        this.explosions = []
        this.holes = []
        this.mapCfg = undefined
        this.gridSize = undefined
        this.resizeCallback = undefined
    }

    init(resizeCallback) {
        if (resizeCallback) this.resizeCallback = resizeCallback

        this.setMapCfg()
        this.resizeCallback()
        this.gridSize = window.g.context.canvas.width / this.mapCfg.gridInRow
    }

    setResizeCallback(resizeCallback) {
        this.resizeCallback = resizeCallback
    }

    setMapCfg() {
        const lv = window.g.gameLv
        let curCfg
        let set = false
        gameConfig.mapConfig.forEach(cfg => {
            if (!set && lv <= cfg.lv) {
                set = true
                curCfg = cfg
            }
        })
        this.mapCfg = curCfg
    }

    reset(rebuild = false) {
        this.init()
        this.posList = []
        this.randomMilk()
        this.randomFence()
        this.randomBall()
        if(!rebuild)
            this.randomHole()
    }

    posExit(gridPos) {
        let exit = false
        this.posList.forEach(gPos => {
            if (gPos[0] === gridPos[0] && gPos[1] === gridPos[1])
                exit = true
        })
        return exit
    }

    createExplosion(img, x, y){
        const explosion = new Explosion(img, x, y)
        this.explosions.push(explosion)
    }

    update(elapsed){
        this.explosions.forEach((explosion,i) => {
            if(explosion.finish )
                this.explosions.splice(i, 1)
            else
                explosion.update(elapsed)
        })
        this.holes.forEach(hole => {
            hole.update(elapsed)
        })
    }

    draw(context) {

        this.milks.forEach(milk => {
            milk.draw(context)
        })
        this.fences.forEach(fence => {
            fence.draw(context)
        })
        this.balls.forEach(ball => {
            ball.draw(context)
        })

        this.explosions.forEach(explosion => {
            explosion.draw(context)
        })

        this.holes.forEach(hole => {
            hole.draw(context)
        })
    }

    randomFence() {
        this.fences = []
        const inLimit = (row, col) => {
            return col > 4 && col < tool.maxCol() - 4
        }
        const curLen = this.posList.length
        while (this.posList.length < curLen + this.mapCfg.fences) {
            const row = Math.round(Math.random() * tool.maxRow())
            const col = Math.round(Math.random() * tool.maxCol())
            const g = [row, col]
            if (!this.posExit(g) && inLimit(row, col)) {
                this.posList.push(g)
                const pos = tool.grid2coord(row, col)
                this.fences.push(new Fence(pos.x, pos.y))
            }
        }
    }

    randomHole() {
        this.holes = []
        const inLimit = (row, col) => {
            return col > 2 && col < tool.maxCol() - 2
        }
        const curLen = this.posList.length
        while (this.posList.length < curLen + this.mapCfg.holes) {
            const row = Math.round(Math.random() * tool.maxRow())
            const col = Math.round(Math.random() * tool.maxCol())
            const g = [row, col]
            if (!this.posExit(g) && inLimit(row, col)) {
                this.posList.push(g)
                const pos = tool.grid2coord(row, col)
                this.holes.push(new Hole(pos.x, pos.y))
            }
        }
    }

    randomBall() {
        this.balls = []
        const inLimit = (row, col) => {
            return col > 2 && col < tool.maxCol() - 2
        }
        const curLen = this.posList.length
        while (this.posList.length < curLen + this.mapCfg.balls) {
            const row = Math.round(Math.random() * tool.maxRow())
            const col = Math.round(Math.random() * tool.maxCol())
            const g = [row, col]
            if (!this.posExit(g) && inLimit(row, col)) {
                this.posList.push(g)
                const pos = tool.grid2coord(row, col)
                this.balls.push(new Ball(pos.x, pos.y))
            }
        }
    }

    randomMilk() {
        this.milks = []
        const inLimit = (row, col) => {
            return col > 2 && col < tool.maxCol() - 2
        }
        const curLen = this.posList.length
        while (this.posList.length < curLen + this.mapCfg.milks) {
            let row = Math.round(Math.random() * tool.maxRow())
            row = Math.random() < 0.3 ? tool.maxRow() : row
            const col = Math.round(Math.random() * tool.maxCol())
            const g = [row, col]
            if (!this.posExit(g) && inLimit(row, col)) {
                this.posList.push(g)
                const pos = tool.grid2coord(row, col)
                this.milks.push(new Milk(pos.x, pos.y))
            }
        }
    }
}

export default Map