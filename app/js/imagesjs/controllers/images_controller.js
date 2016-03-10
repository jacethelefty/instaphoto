const angular = require('angular');

module.exports = function(imagesApp) {
  imagesApp.controller('ImagesController', ['$scope', '$http', 'Resource', 'imageStore', function($scope, $http, Resource, imageStore) {

    $scope.images = [];
    var imageService = Resource('/images');

    $scope.remove = function(index) {
      $scope.images.splice(index, 1);
    };

    $scope.dismissError = function(err) {
      $scope.errors.splice($scope.errors.indexIf(err), 1);
    };

    $scope.getImage = function() {
      imageService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.images = res;
      });
    };

    $scope.createImage = function(image) {
      imageService.create(image, function(err, res) {
        if (err) {
          // $scope.images.splice($scope.images.indexOf(image), 1);
          // $scope.errors.push('Could not save the image');
          return console.log(err);
        }
      $scope.images.push(res);
        $scope.newimage = null;
      });
    };

    $scope.deleteImage = function(image) {
      if (!image._id) return setTimeout(function() {$scope.deleteImage(image);}, 1000);
      imageService.delete(image, function(err, res) {
        if (err) {
          $scope.errors.push('could not delete image');
          return console.log(err);
        }
        $scope.images.splice($scope.images.indexOf(image), 1);
      });
    };
  }]);
};
