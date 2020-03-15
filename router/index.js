const express = require('express')
const app = express()
const request = require('../controller/handle');



app.post('/Deposit', async (req, res) => {
    try {
        var result = await new request().Deposit(req.body)
        res.send(result)
    } catch (error) {
        res.send(error)
    }


})

app.post('/Withdraw', async (req, res) => {
    try {
        var result = await new request().Withdraw(req.body)
        res.send(result)
    } catch (error) {
        res.send(error)
    }


})

app.post('/Transfer', async (req, res) => {
    try {
        var result = await new request().Transfer(req.body)
        res.send(result)
    } catch (error) {
        res.send(error)
    }


})


module.exports = app