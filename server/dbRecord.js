class RecordUidCounter {
    constructor(dbHander) {
        this.key = 'RecordUidCounter'
        this.start = 1001
        this.dbHander = dbHander
    }

    format(num) {
        return { 'key': this.key, 'num': num }
    }

    query() {
        return { 'key': this.key }
    }

    updatePattern(num) {
        return { $set: { 'num': num } }
    }

    getCounter(cb) {
        this.dbHander.findOne(this.query(), (err, doc) => {
            if (err) {
                console.log(`err: ${err}`)
                return cb(undefined)
            }
            if (doc) {
                return cb(doc.num)
            }
            this.dbHander.insert(this.format(this.start), (err, doc) => {
                return cb(doc.num)
            })
        })
    }

    updateCounter(newCounter) {
        console.log(this.updatePattern(newCounter))
        this.dbHander.update(this.query(), this.updatePattern(newCounter), {}, (err, doc) => {
            if (err) console.log(`err: ${err}`)
        })
    }
}

module.exports = { RecordUidCounter }