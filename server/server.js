const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const request = require('request');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;
mongoose.connect('mongodb://god:blessrng7@ds253783.mlab.com:53783/images',  {useNewUrlParser: true});

// function sendError(res) {
//   return function (e) {
//     return res.status(500).send(e);
//   };
// }
let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('http://www.whelanslive.com/wp-content/uploads/2018/06/JMITP-Logo-image-p.jpg', './public/images/google.png', function(){
  console.log('done');
});

app.use('/api', router);

app.listen(port, function () {
  console.log(`api running on port ${port}`);
});