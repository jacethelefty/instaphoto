const mongoose = require('mongoose');
const express = require('express');
const app = express();
const imageRouter = require(__dirname + '/routes/image_routes');
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/imagesdb');

app.use('/api', imageRouter);

app.use(express.static(__dirname + '/build')).listen(PORT, () => console.log('server up on port:' + PORT));
