const db = require('./db')

class GameData {
    constructor() {
        this.currentUid = undefined
        this.lvList = undefined
        this.create = undefined
        this.limit = 10
    }

    init() {
        db.load((count, create, list) => {
            this.currentUid = Number(count)
            this.create = Number(create)
            this.lvList = list
            console.log(`game data init, uid:${this.currentUid}, create:${new Date(this.create)}`)
        })
    }

    increase() {
        this.currentUid++
        db.getRecourdCounter().updateCounter(this.currentUid)
        return this.currentUid
    }

    remember(info) {
        if (this.lvList.length < this.limit) {
            this.lvList.push(info)
            this.filter()
        } else {
            const last = this.lvList[this.lvList.length - 1]
            if (info.score > last.score) {
                this.lvList.push(info)
                this.filter()
            }
        }
    }

    filter() {
        this.lvList.sort((a, b) => {
            if (a.score != b.score) return b.score - a.score
            if (a.lv != b.lv) return b.lv - a.lv
            return a.uid - b.uid
        })
        if (this.lvList.length >= this.limit) {
            this.lvList.splice(this.limit, this.lvList.length - this.limit + 1)
        }
        this.updateDbLvList()
    }

    updateDbLvList() {
        db.getRecordLvs().updateList(this.lvList)
    }
}

module.exports = GameData