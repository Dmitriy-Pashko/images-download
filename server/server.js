const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Image = require('../model/images');
const download = require('../controller/download');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;
mongoose.connect('mongodb://god:blessrng7@ds253783.mlab.com:53783/images',  {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

function sendError(res) {
  return function (e) {
    return res.status(500).send(e);
  };
}

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

  let path = `./public/images/${name}`;

  Image.findOne({
    url:req.body.url,
  },(err, img) => {
    if (err) throw err;

    if(img){
      res.send('You alredy have this image in the gallery');
    } else if(req.body.url.match(/\.(jpeg|jpg|png)$/) !== null){
      download(req.body.url, path, function(){
        let image = new Image({
          name:name,
          url:req.body.url,
        })
  
        image.save()
          .then(() => {
            return res.send("Image downloded, you can check it by going to the gallery");
          })
          .catch(sendError(res));
        console.log('done');
      }) 
    } else {
      res.send("You have to insert imges with certain extantions, remember?")
    }
  })
});

app.use(express.static(__dirname + 'public'));

app.use('/api', router);

app.listen(port, function () {
  console.log(`api running on port ${port}`);
});