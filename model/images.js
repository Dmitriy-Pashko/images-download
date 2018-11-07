const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImagesSchema = new Schema({
  name: String,
  url: String,
});

module.exports = mongoose.model('images_list', ImagesSchema, 'images_list');