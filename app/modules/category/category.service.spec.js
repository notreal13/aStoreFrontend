'use strict';

describe('Service: categoryService', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var service, $httpBackend, $log, url;

  beforeEach(inject(function(_$httpBackend_, _$log_, _categoryService_, REST) {
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    url = REST.fullUrl + '/category';
    service = _categoryService_;

    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixture';
    var validCategories = getJSONFixture('categories.json');

    $httpBackend.whenGET(url).respond(function() {
      return [200, validCategories];
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have service be defined...', function() {
    expect(service).toBeDefined();
  });

  it('should get allCategories...', function() {
    $httpBackend.expectGET(url);

    var allCategories = service.query();

    $httpBackend.flush();

    expect(allCategories.length).toEqual(2);
    expect(allCategories[0].id).toBe(1);
    expect(allCategories[0].name).toBe('man');
  });

});