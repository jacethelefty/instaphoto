module.exports = function(imagesApp) {
  require('./controllers/images_controller')(imagesApp);

  require('./directives/footer_copyright_directive')(imagesApp);
};
