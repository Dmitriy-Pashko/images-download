const express = require('express');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;
mongoose.connect('mongodb://god:blessrng7@ds253783.mlab.com:53783/images',  {useNewUrlParser: true});

function sendError(res) {
  return function (e) {
    return res.status(500).send(e);
  };
}

app.use('/api', router);

app.listen(port, function () {
  console.log(`api running on port ${port}`);
});