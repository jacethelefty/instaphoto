module.exports = function(app) {
  require('./image_store')(app);
  require('./resource_service')(app);
};
