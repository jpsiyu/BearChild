const DataStore = require('nedb')
const dbRecord = require('./dbRecord')

const db = new DataStore({ filename: './server/game.db' })
const counter = new dbRecord.RecordUidCounter(db)

const load = (cb) => {
    db.loadDatabase((err) => {
        counter.getCounter(cb)
    })
}

const getCounter = () => {
    return counter
}

module.exports = {
    load,
    getCounter,
}