import Milk from './milk'
import Fence from './fence'
import tool from './tool'
import gameConfig from './gameConfig'

class Map {
    constructor() {
        this.milks = []
        this.fences = []
        this.posList = []
        this.mapCfg = undefined
        this.gridSize = undefined
        this.resizeCallback = undefined
    }

    init(resizeCallback){
        if(resizeCallback) this.resizeCallback = resizeCallback

        this.setMapCfg()
        this.resizeCallback()
        this.gridSize = window.g.context.canvas.width / this.mapCfg.gridInRow
    }

    setResizeCallback(resizeCallback){
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

    reset() {
        this.init()
        this.posList = []
        this.randomMilk()
        this.randomFence()
    }

    posExit(gridPos){
        let exit = false
        this.posList.forEach( gPos => {
            if( gPos[0] === gridPos[0] && gPos[1] === gridPos[1])
                exit = true
        })
        return exit
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

    randomMilk() {
        this.milks = []
        const inLimit = (row, col) => {
            return col > 2 && col < tool.maxCol() - 2
        }
        const curLen = this.posList.length
        while (this.posList.length < curLen + this.mapCfg.milks) {
            const row = Math.round(Math.random() * tool.maxRow())
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