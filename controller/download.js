const fs = require('fs');
const request = require('request');
const sharp = require('sharp');


let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    let resizeStream;

    if(uri.match(/\.(jpeg|jpg)/)){
      resizeStream = sharp().jpeg({quality: 50})
    } else {
      resizeStream = sharp().png({quality: 50})
    }
    request(uri).pipe(resizeStream).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

module.exports = download;