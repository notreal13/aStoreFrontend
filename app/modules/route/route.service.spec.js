'use strict';

describe('Service: routeService', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var service, $httpBackend, $log, url;

  beforeEach(inject(function(_$httpBackend_, _$log_, _routeService_, REST) {
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    url = REST.fullUrl + '/route';
    service = _routeService_;

    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixture';
    var goodRoutes2 = getJSONFixture('routes.json');

    $httpBackend.whenGET(url).respond(function() {
      return [200, goodRoutes2];
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have service be defined...', function() {
    expect(service).toBeDefined();
  });

  it('should get allRoutes...', function() {
    service.query();
    $httpBackend.expectGET(url);
    $httpBackend.flush();
  });

});