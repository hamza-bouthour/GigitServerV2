const express = require('express');
const searhRouter = express.Router();
const cors = require('./cors');
const quotes = require('../services/quotes');


searhRouter.route('/')
.options(cors.cors, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    res.send('GET operation not supported')
})
.post(cors.cors, async (req, res, next) => {
    console.log(req.body)
    try {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json( await quotes.fetchQueryBand(req.body.query));
    } 
    catch (err) {
        console.log(`Error while getting quotes, ${err.message}`)
        new Error(err.message)
        
    }
})
.put(cors.cors, (req, res, next) => {
    res.send('PUT operation not supported')
})
.delete(cors.cors, (req, res, next) => {
    res.send('DELETE operation not supported')
})

module.exports = searhRouter