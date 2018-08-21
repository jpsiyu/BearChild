const DataStore = require('nedb')
const dbRecord = require('./dbRecord')

const db = new DataStore({ filename: './server/game.db' })
const counter = new dbRecord.RecordUidCounter(db)
const lvs = new dbRecord.RecordLevelList(db)

const load = (cb) => {
    db.loadDatabase((err) => {
        counter.getCounter( (count, create) => {
            lvs.getList( (lvList) => {
                cb(count, create, lvList)
            })
        })
    })
}

const getRecourdCounter = () => {
    return counter
}

const getRecordLvs = () => {
    return lvs
}

module.exports = {
    load,
    getRecourdCounter,
    getRecordLvs,
}