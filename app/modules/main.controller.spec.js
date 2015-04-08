'use strict';

describe('Controller: MainController', function() {
  var mockUserService, mockAuthService, mockSessionService, mockTmhDynamicLocale;

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);

    mockUserService = {
      get: function() {}
    };
    $provide.value('userService', mockUserService);
 
    mockAuthService = {
      logout: function() {}
    };
    $provide.value('authService', mockAuthService);

    mockSessionService = {
      isAuthenticated: function() {return false; },
      isAuthorized: function() {}
    };
    $provide.value('sessionService', mockSessionService);

    mockTmhDynamicLocale = jasmine.createSpyObj('tmhDynamicLocale', ['set']);
    $provide.value('tmhDynamicLocale', mockTmhDynamicLocale);

  }));

  var ctrl, $scope, $rootScope, $log, $controller, gettextCatalog, AUTH_EVENTS;

  beforeEach(inject(function(_$rootScope_, _$controller_, _$log_, _gettextCatalog_, _AUTH_EVENTS_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $log = _$log_;

    gettextCatalog = _gettextCatalog_;
    AUTH_EVENTS = _AUTH_EVENTS_;

    $scope = $rootScope.$new();
    ctrl = $controller('MainController', {
      '$scope': $scope
    });

  }));

  it('should have controller be defined...', function() {
    expect(ctrl).toBeDefined();
  });

  it('should init controller...', function() {
    expect(ctrl.selectedLanguage.id).toEqual('ru');
    expect(ctrl.isAuthorized).toBeDefined();
    expect(ctrl.isAuthenticated).toEqual(false);
    expect(ctrl.userInfo).toBeNull();
  });

  it('should init controller already authenticated...', function() {
  	spyOn(mockSessionService, 'isAuthenticated').and.returnValue(true);
  	spyOn(mockUserService, 'get').and.returnValue('user');

  	$scope = $rootScope.$new();
  	ctrl = $controller('MainController', {
  		'$scope': $scope
  	});

  	expect(ctrl.selectedLanguage.id).toEqual('ru');
  	expect(ctrl.isAuthenticated).toEqual(true);
    expect(ctrl.userInfo).toBeDefined();  	
    expect(mockSessionService.isAuthenticated).toHaveBeenCalled();
    expect(mockUserService.get).toHaveBeenCalled();
  });

  it('should getUserInfo after event:login success...', function() {
  	var userInfo = 'user-info';
		spyOn(mockSessionService, 'isAuthenticated').and.returnValue(true);
		spyOn(mockUserService, 'get').and.returnValue(userInfo);
  	spyOn($rootScope, '$on').and.callThrough();

		$rootScope.$on(AUTH_EVENTS.loginSuccess, function(event) {
			expect(event.name).toBe(AUTH_EVENTS.loginSuccess);
		});
		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

		expect($rootScope.$on).toHaveBeenCalled();
  	expect(mockSessionService.isAuthenticated).toHaveBeenCalled();
  	expect(mockUserService.get).toHaveBeenCalled();
  	expect(ctrl.userInfo).toBe(userInfo);
  });

  it('should getUserInfo after event:logout success...', function() {
  	ctrl.userInfo = 'someUser';
  	ctrl.isAuthenticated = true;
		spyOn(mockSessionService, 'isAuthenticated').and.returnValue(false);
  	spyOn($rootScope, '$on').and.callThrough();

		$rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
			expect(event.name).toBe(AUTH_EVENTS.logoutSuccess);
		});
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

		expect($rootScope.$on).toHaveBeenCalled();
  	expect(mockSessionService.isAuthenticated).toHaveBeenCalled();
  	expect(ctrl.userInfo).toBeNull();
  	expect(ctrl.isAuthenticated).toBe(false);
  });

  it('should logout...', function() {
  	spyOn(mockAuthService, 'logout').and.callThrough();
  	ctrl.userInfo = 'someUser';
  	ctrl.isAuthenticated = true;
  	
  	ctrl.logout();

  	expect(mockAuthService.logout).toHaveBeenCalled();
  	expect(ctrl.userInfo).toBeNull();
  	expect(ctrl.isAuthenticated).toBe(false);
  });

  it('should translate and change locale...', function() {
  	spyOn(gettextCatalog, 'setCurrentLanguage');
  	var lang = ctrl.languages[1];

    ctrl.translate(lang);

    expect(ctrl.selectedLanguage).toBe(lang);
  	expect(gettextCatalog.setCurrentLanguage).toHaveBeenCalledWith(lang.id);
  	expect(mockTmhDynamicLocale.set).toHaveBeenCalledWith(lang.id);
  });

});