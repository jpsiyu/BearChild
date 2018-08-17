const express = require('express')
const path = require('path')
const pjson = require('../package.json')
const cors = require('cors')

const app = express()
app.use(cors())
app.use('*', (req, res, next) => {
    next()
})

const prefix = (url='') => { return `${pjson.prefix}${url}` }

app.use(prefix(), express.static(path.resolve(__dirname, '../dist')))
app.use(prefix(), express.static(path.resolve(__dirname, '../client/public')))

app.use('*', (req, res) => {
    console.log('404', req.originalUrl)
    res.status(404).json('404, Hey, Page Not Found!')
})

app.use((err, req, res) => {
    console.log('ERROR', err)
    res.status(500).json('500')
})

app.listen(pjson.port, console.log(`app listening on port ${pjson.port}....`))