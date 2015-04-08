'use strict';

describe('Service: authService', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var service, $httpBackend, $log, $timeout, url, salt, credentials, authAccessElement, asmCrypto;

  beforeEach(inject(function(_$httpBackend_, _$log_, _$timeout_, _authService_, _asmCrypto_, REST) {
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    $timeout = _$timeout_;
    asmCrypto = _asmCrypto_;
    service = _authService_;

    credentials = {};
    credentials.username = 'oleg@setco';
    credentials.password = '123';

    url = REST.fullUrl + '/user/login';

    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixture';
    salt = getJSONFixture('salt.json').salt;
    authAccessElement = getJSONFixture('authAccessElement.json');

    // path to default...
    $httpBackend.whenGET('modules/route/route.html').respond();
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have service be defined...', function() {
    expect(service).toBeDefined();
    $httpBackend.flush();        
  });

  it('should successfully login...', function() {
    var login = service.login(credentials, salt);
    $httpBackend.whenPOST(url).respond(authAccessElement);
    $httpBackend.expectPOST(url);
    $httpBackend.flush();    
    login.then(function(data) {
      expect(data).toBe(authAccessElement.token);
    });
  });

  it('should failed login...', function() {
    var fake = {
      token: ''
    };
    $httpBackend.whenPOST(url).respond(fake);
    var login = service.login(credentials, salt);
    $httpBackend.expectPOST(url);
    $httpBackend.flush();
    login.then(function(data) {
      expect(data).toBe('');
    });
  });

  it('should do nothing when all tasks have been flushed...', function() {
    $timeout(angular.noop);
    var login = service.login(credentials, salt);
    $httpBackend.whenPOST(url).respond(authAccessElement);
    $httpBackend.flush();
    login.then(
      function() {});
    $timeout.flush();
    expect(function() {
      $timeout.verifyNoPendingTasks();
    }).not.toThrow();
  });

  it('should have hmac same as CryptoJS...', function() {
    var CryptoJShmac = '84ec44c7d6fc41917953a1dafca3c7d7856f7a9d0328b991b76f0d36be1224b9';
    var hmac = asmCrypto.HMAC_SHA256.hex('password', 'salt' );
    expect(hmac).toBe(CryptoJShmac);
    $httpBackend.flush();   
  });

});