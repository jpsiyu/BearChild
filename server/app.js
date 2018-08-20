const express = require('express')
const path = require('path')
const pjson = require('../package.json')
const cors = require('cors')
const db = require('./db')
const GameData = require('./gameData')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('*', (req, res, next) => {
    next()
})

const prefix = (url = '') => { return `${pjson.prefix}${url}` }

app.use(prefix(), express.static(path.resolve(__dirname, '../dist')))
app.use(prefix(), express.static(path.resolve(__dirname, '../client/public')))

app.get(prefix('/uid'), (req, res) => {
    res.status(200).json(data.increase())
})

app.post(prefix('/lv'), (req, res) => {
    data.remember({uid: req.body.uid, lv: req.body.lv})
    res.status(200).json(1)
})

app.get(prefix('/rank'), (req, res) => {
    res.status(200).json(data.lvList)
})

app.use('*', (req, res) => {
    console.log('404', req.originalUrl)
    res.status(404).json('404, Hey, Page Not Found!')
})

app.use((err, req, res) => {
    console.log('ERROR', err)
    res.status(500).json('500')
})


const data = new GameData()
data.init(() => {
    app.listen(pjson.port, () => {
        console.log(`app listening on port ${pjson.port}...`)
    })
})