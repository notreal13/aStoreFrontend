'use strict';

describe('Controller: LoginController', function() {
  var mockSaltService, mockAuthService, mockUserService;

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);

    mockSaltService = {
      getSalt: function() {}
    };
    $provide.value('saltService', mockSaltService);

    mockAuthService = {
      login: function() {}
    };
    $provide.value('authService', mockAuthService);

    mockUserService = {
      get: function() {}
    };
    $provide.value('userService', mockUserService);

  }));

  var ctrl, $scope, $log, $q, credentials;

  beforeEach(inject(function($rootScope, $controller, _$log_, _$q_) {
    $log = _$log_;
    $q = _$q_;

    credentials = {};
    credentials.username = 'oleg@setco.ru';
    credentials.password = '123';

    $scope = $rootScope.$new();
    ctrl = $controller('LoginController', {
      '$scope': $scope
    });

  }));

  it('shoulg have controller be defined...', function() {
    expect(ctrl).toBeDefined();
  });

  it('should init and set credentials...', function() {
    expect(ctrl.credentials.username).toBe('');
    expect(ctrl.credentials.password).toBe('');
    ctrl.credentials = credentials;
    expect(ctrl.credentials.username).toBe(credentials.username);
    expect(ctrl.credentials.password).toBe(credentials.password);
  });

  it('should successfully login...', function() {
    var getSaltDeferred = $q.defer();
    spyOn(mockSaltService, 'getSalt').and.returnValue(getSaltDeferred.promise);
    var loginDeferred = $q.defer();
    spyOn(mockAuthService, 'login').and.returnValue(loginDeferred.promise);
    spyOn(mockUserService, 'get').and.returnValue('ok');
    ctrl.credentials = credentials;
    ctrl.login();

    expect(mockSaltService.getSalt).toHaveBeenCalled();
    expect(mockSaltService.getSalt).toHaveBeenCalledWith(credentials.username);

    getSaltDeferred.resolve('someSalt');
    $scope.$digest();

    expect(mockAuthService.login).toHaveBeenCalled();
    expect(mockAuthService.login).toHaveBeenCalledWith(credentials, 'someSalt');

    loginDeferred.resolve('ok');
    $scope.$digest();
    expect(mockUserService.get).toHaveBeenCalled();
  });

});