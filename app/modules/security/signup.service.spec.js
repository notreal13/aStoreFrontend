'use strict';

describe('Service: signupService', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);

  }));

  var service, $httpBackend, $log, urlSignup, urlPassword, user, validSalt;

  beforeEach(inject(function(_$httpBackend_, _$log_, REST, _signupService_) {
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    service = _signupService_;

    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixture';
    validSalt = getJSONFixture('salt.json');

    user = {
      firstName: 'firstName',
      lastName: 'lastName',
      login: 'aa@aa',
      phone: '111-222-333',
      password: '123'
    };

    urlSignup = REST.fullUrl + '/user/signup';
    urlPassword = REST.fullUrl + '/user/password';

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have service be defined...', function() {
    expect(service).toBeDefined();
  });

  it('should signup new user...', function() {
    var signup = service.signup(user);
    $httpBackend.whenPOST(urlSignup).respond(validSalt);
    $httpBackend.expectPOST(urlSignup);
    $httpBackend.flush();
    signup.then(function(data) {
      expect(data).toBe(validSalt.salt);
    });
  });

  it('should set password...', function() {
    var setPassword = service.setPassword('username', 'password', validSalt.salt);
    $httpBackend.whenPOST(urlPassword).respond('ok');
    $httpBackend.expectPOST(urlPassword);
    $httpBackend.flush();
    setPassword.then(function(data) {
        expect(data).toBe('ok');
    });
  });

  // it('hack the test...', function() {
  //   service.setPassword('', '', '');
  //   $httpBackend.whenPOST(urlPassword).respond('ok');
  //   $httpBackend.expectPOST(urlPassword);
  //   $httpBackend.flush();
  // })

});