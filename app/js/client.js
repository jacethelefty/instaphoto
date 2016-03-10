const angular = require('angular');
require('angular-route');
const imagesApp = angular.module('imagesApp', ['ngRoute']);

require('./services')(imagesApp);
require('./imagesjs')(imagesApp);

imagesApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'ImagesController',
      templateUrl: '/views/home.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);
