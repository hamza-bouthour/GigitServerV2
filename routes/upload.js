const express = require('express');
var path = require('path');
const cors = require('./cors');
// const fileUpload = require('express-fileupload');
const multer = require('multer');
const quotes = require('../services/quotes');


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
// const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();
uploadRouter.route('/')

  
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(cors.cors, upload.single('image'), async (req, res) => {
    try {
        // console.log(req.body.inputId)
       
        // let path = req.file.destination
        // let imageName = req.file.originalname
        // let imagePath = path + imageName
        res.setHeader('Content-Type', 'application/json')
        // console.log(iml)
        res.json( await quotes.addPhoto(req.file.originalname, req.body.inputId))
        // res.send('file uploaded')
    }
    catch (err) {
        res.send(err)
    }
})
// .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /imageUpload');
// })
// .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
//     res.statusCode = 403;
//     res.end('DELETE operation not supported on /imageUpload');
// });

module.exports = uploadRouter;