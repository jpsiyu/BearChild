const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.static(path.resolve(__dirname, '../client/public')))
app.use(express.static(path.resolve(__dirname, '../client/images')))

app.use('*', (req, res) => {
    res.status(404).json('404')
})

app.use((err, req, res) => {
    console.log('ERROR', err)
    res.status(500).json('500')
})

app.listen(3000, console.log('app listening on port 3000....'))