const db = require('./db')

class GameData {
    constructor() {
        this.currentUid = undefined
        this.lvList = undefined
        this.limit = 10
    }

    init(success) {
        db.load((count, list) => {
            this.currentUid = count
            this.lvList = list
            console.log(`game data init, uid:${this.currentUid}, lvList:${this.lvList}`)
            success()
        })
    }

    increase() {
        this.currentUid++
        db.getRecourdCounter().updateCounter(this.currentUid)
        return this.currentUid
    }

    remember(info) {
        if (this.lvList.length == 0) {
            this.lvList.push(info)
            this.updateDbLvList()
            return
        }
        const last = this.lvList[this.lvList.length - 1]
        if (this.lvList.length >= this.limit && info.lv <= last.lv) {
            return
        }

        let insertIndex = undefined
        this.lvList.forEach((element, index) => {
            if (insertIndex == undefined && info.lv > element.lv) {
                insertIndex = index
            }
        })

        if (insertIndex == undefined && this.lvList.length < this.limit) {
            insertIndex = this.lvList.length
        }
        if (insertIndex != undefined) {
            this.lvList.splice(insertIndex, 0, info)
            if(this.lvList.length >= this.limit){
                this.lvList.splice(this.limit, this.lvList.length-this.limit+1)
            }
            this.updateDbLvList()
        }
    }

    updateDbLvList() {
        db.getRecordLvs().updateList(this.lvList)
    }
}

module.exports = GameData