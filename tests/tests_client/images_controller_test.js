var angular = require('angular');

describe('images controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('imagesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var imagesController = $ControllerConstructor('ImagesController', {$scope});
    expect(typeof imagesController).toBe('object');
    expect(Array.isArray($scope.images)).toBe(true);
    expect(typeof $scope.getImage).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('ImagesController', {$scope});
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/images', () => {
       $httpBackend.expectGET('http://localhost:3000/api/images').respond(200, [{title: 'Bonsai'}]);
       $scope.getImage();
       $httpBackend.flush();
       expect($scope.images.length).toBe(1);
       expect($scope.images[0].title).toBe('Bonsai');
     });

     it('should create a new image list item', () => {
       $httpBackend.expectPOST('http://localhost:3000/api/images', {title: 'the sent image'}).respond(200, {title: 'the response image'});
       $scope.image = {title: 'the new image'};
       $scope.createImage({title: 'the sent image'});
       $httpBackend.flush();
       expect($scope.images.length).toBe(1);
       expect($scope.image).toBe(null);
       expect($scope.images[0].title).toBe('the response image');
     });

     it('should delete an image', () => {
       var testImage = {title: 'burned image', _id: 1};
       $scope.images.push(testImage);
       expect($scope.images.indexOf(testImage)).not.toBe(-1);
       $httpBackend.expectDELETE('http://localhost:3000/api/images/1').respond(200);
       $scope.deleteImage(testImage);
       $httpBackend.flush();
       expect($scope.images.indexOf(testImage)).toBe(-1);
     });
   });
 });
