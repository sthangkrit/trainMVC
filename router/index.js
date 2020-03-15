const express = require('express')
const app = express()
const request = require('../controller/handle');
app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/test', (req, res) => {
    res.send('hello pong')
})


app.post('/CreateStudent', async (req, res) => {
    try {

    } catch (error) {

    }


})


module.exports = app