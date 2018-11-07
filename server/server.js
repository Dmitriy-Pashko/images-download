const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request');
const Image = require('../model/images');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;
mongoose.connect('mongodb://god:blessrng7@ds253783.mlab.com:53783/images',  {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function sendError(res) {
  return function (e) {
    return res.status(500).send(e);
  };
}

let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

router.route('/images')
.get(function (req, res) {

  Image.find()
    .exec()
    .then((images) => {
      return res.json(images);
    })
    .catch(sendError(res));
})
.post(function (req, res) {

  let findName = req.body.url.split('/');
  let name = findName[findName.length - 1];

  let path = `./public/images/${name}`

  download(req.body.url, path, function(){
    let image = new Image({
      name:name,
      url:req.body.url,
    })

    image.save()
      .then((newImage) => {
        res.send(newImage);
      })
      .catch(sendError(res));
    console.log('done');
  })
});

app.use(express.static('../public/images'));

app.use('/api', router);

app.listen(port, function () {
  console.log(`api running on port ${port}`);
});