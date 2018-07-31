import Milk from './milk'
import Fence from './fence'
import tool from './tool'

class Map {
    constructor() {
        this.milks = []
        this.fences = []
        this.posList = []
        this.milkNum = 14
        this.fenceNum = 3
    }

    reset(){
        this.posList = []
        this.randomMilk()
        this.randomFence()
    }

    randomFence() {
        this.fences = []
        const inLimit = (row, col) => {
            return col > 4 && col < tool.maxCol() - 4
        }
        const curLen = this.posList.length
        while (this.posList.length < curLen + this.fenceNum) {
            const row = Math.round(Math.random() * tool.maxRow())
            const col = Math.round(Math.random() * tool.maxCol())
            const g = [row, col]
            if (!this.posList.includes(g) && inLimit(row, col)) {
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
        while (this.posList.length < curLen + this.milkNum) {
            const row = Math.round(Math.random() * tool.maxRow())
            const col = Math.round(Math.random() * tool.maxCol())
            const g = [row, col]
            if (!this.posList.includes(g) && inLimit(row, col)) {
                this.posList.push(g)
                const pos = tool.grid2coord(row, col)
                this.milks.push(new Milk(pos.x, pos.y))
            }
        }
    }
}

export default Map