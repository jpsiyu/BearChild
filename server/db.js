const DataStore = require('nedb')

const StartNum = 1001
const db = new DataStore({ filename: './server/game.db' })

const format = (num) => {
    return {
        'key': 'record', 'num': num
    }
}

const query = () => {
    return { 'key': 'record' }

}

const load = (cb) => {
    db.loadDatabase((err) => {
        getNum(cb)
    })
}

const getNum = (cb) => {
    db.findOne(query(), (err, doc) => {
        if (!err) {
            if (!doc) {
                db.insert(format(StartNum), (err, doc) => {
                    cb(doc.num)
                })
            } else {
                cb(doc.num)
            }
        }
    })
}

const updateNum = (num) => {
    db.update(query(), { $set: { 'num': num } }, {}, (err, doc) => {
        if (err) console.log(`err: ${err}`)
    })
}

module.exports = {
    load,
    getNum,
    updateNum,
}