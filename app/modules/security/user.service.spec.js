'use strict';

describe('Service: userService', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var service, $http, $httpBackend, $log, url, validUserInfo;
  
  beforeEach(inject(function(_$log_, _$http_, _$httpBackend_, REST, _userService_) {
    $log = _$log_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    service = _userService_;

    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixture';
    validUserInfo = getJSONFixture('userInfo.json');

    url = REST.fullUrl + '/user/info';

    $httpBackend.when('GET', url).respond(validUserInfo);
  }));

  it('should have service be defined...', function() {
    expect(service).toBeDefined();
  });

  it('should get user info...', function() {
    var userInfo = service.get();
    $httpBackend.expectGET(url);
    $httpBackend.flush();   
    expect(userInfo.email).toBe(validUserInfo.email);
  });

});