const express = require('express');
const jsonParser = require('body-parser').json();
const Image = require(__dirname + '/../models/imageModel');
const handleDBError = require(__dirname + '/../lib/db_error_handler');

var imageRouter = module.exports = exports = express.Router();

imageRouter.post('/images', jsonParser, (req, res) => {
  var newImage = new Image(req.body);
  newImage.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('POSTed!');
});

imageRouter.get('/images',(req, res) => {
  Image.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('GETted!');
});

imageRouter.delete('/images/:id', (req, res) => {
  Image.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'image deleted'});
  });
  console.log('DELETEd!');
});
