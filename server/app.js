const express = require('express')
const path = require('path')
const pjson = require('../package.json')

const app = express()

app.use('*', (req, res, next) => {
    console.log('Req For', req.originalUrl)
    next()
})

const prefix = (url='') => { return `${pjson.prefix}${url}` }

console.log(prefix())

app.use(prefix(), express.static(path.resolve(__dirname, '../dist')))
app.use(prefix(), express.static(path.resolve(__dirname, '../client/public')))
app.use(prefix(), express.static(path.resolve(__dirname, '../client/music')))
app.use(prefix(), express.static(path.resolve(__dirname, '../client/images')))

app.use('*', (req, res) => {
    res.status(404).json('404, Hey, Page Not Found!')
})

app.use((err, req, res) => {
    console.log('ERROR', err)
    res.status(500).json('500')
})

app.listen(pjson.port, console.log(`app listening on port ${pjson.port}....`))