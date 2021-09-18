const express = require('express');
const bandsRouter = express.Router();
const cors = require('./cors');
const quotes = require('../services/quotes');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
// var upload = multer({ dest: 'public/' });

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFileFilter});

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
        console.log(req.body)
        res.setHeader('Content-Type', 'application/json')
        await quotes.addBand(req.body)
        res.json( await quotes.getBand(req.body.name))
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
bandsRouter.route('/band/members')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.post(cors.cors, async (req, res, next) => { 
    try {
        req.body.list.map(async (member) => {
            await quotes.addMembersToBand(member, req.body.id)
        })
        res.setHeader('Content-Type', 'application/json')
        res.send('successful')
    }
     catch (err) {
        new Error(err.message)
    }
    
})

module.exports = bandsRouter;