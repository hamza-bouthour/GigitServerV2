const cors = require('cors');

const whiteList = ['http://localhost:3000'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    console.log(whiteList.indexOf(req.header('Origin')))
    if(whiteList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: '*' };
    } else {
        corsOptions = { origin: '*' };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate)