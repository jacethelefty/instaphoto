module.exports = function(app) {
  app.directive('copyright', function() {
    return {
      restrict: 'EA',
      template: '<p>Copyright &copy 2016</p>'
    };
  });
};
