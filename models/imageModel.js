var mongoose = require('mongoose');

var imagesSchema = new mongoose.Schema({
  image: {type: String},
  title: {type: String}
});

module.exports = mongoose.model("image", imagesSchema);
