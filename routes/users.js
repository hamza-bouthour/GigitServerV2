
const express = require('express');
const usersRouter = express.Router();
const cors = require('./cors');
const quotes = require('../services/quotes');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   // res.send('respond with a resource');
//   res.redirect('http://localhost:3000/home')
// });

usersRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, async (req, res, next) => {
    // try {
    //     res.statusCode = 200
    //     res.setHeader('Content-Type', 'application/json')
    //     res.json(await quotes.getBands());
    // } catch (err) {
    //     console.log(`Error while getting quotes, ${err.message}`)
    //     new Error(err.message)
    // }
    res.send('GET OPERATIONS NOT SUPPORTED')
})
.post(cors.cors, async (req, res, next) => { 
    try {
        let email = req.body.email;
        let password = req.body.password
        console.log(email, password)
        res.setHeader('Content-Type', 'application/json')
        // await quotes.addBand(req.body)
        res.json( await quotes.verifyAdmin(email, password))
    }
     catch (err) {
        new Error(err.message)
    }
    
})

module.exports = usersRouter;
;
