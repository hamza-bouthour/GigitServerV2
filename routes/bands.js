const express = require('express');
const bandsRouter = express.Router();
const cors = require('./cors');
const quotes = require('../services/quotes');
const multer  = require('multer');

bandsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, async (req, res, next) => {
    try {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(await quotes.getBands());
    } catch (err) {
        console.log(`Error while getting quotes, ${err.message}`)
        new Error(err.message)
    }
    

})
.post(cors.cors, async (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'application/json')
        // res.json( await quotes.addBand(req.body))
        res.send('Hello POST bands')
        // console.log(req.body)
    }
     catch (err) {
        new Error(err.message)
    }
    
})

bandsRouter.route('/:bandId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.corsWithOptions, async (req, res, next) => {
    console.log(req.params.bandId)
    try {
    
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        // res.json( await quotes.getBandsQuery('band_id', req.params.bandId));
        res.json( await quotes.getArtists(req.params.bandId) )
    } catch (err) {
        console.log(`Error while getting quotes, ${err.message}`)
        new Error(err.message)
    }
})
// .delete(cors.corsWithOptions, async(req, res, next) => {
//     console.log(req.params.bandId)
//     try {
//         res.statusCode = 200
//         res.setHeader('Content-Type', 'application/json')
//         res.json( await quotes.deleteBand(req.params.bandId));
//     }
//     catch (err) {
//         console.log(`Error while getting quotes, ${err.message}`)
//         new Error(err.message)
//     }
// })
module.exports = bandsRouter;