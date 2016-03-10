var angular = require('angular');

describe('resource service', () => {
  beforeEach(angular.mock.module('imagesApp'));

  var $httpBackend;
  var Resources;
  beforeEach(angular.mock.inject(function(_$httpBackend_, Resource) {
    $httpBackend = _$httpBackend_;
    Resources = Resource;
  }));

  it('should be a service', () => {
    expect(typeof Resources).toBe('function');
  });
});
