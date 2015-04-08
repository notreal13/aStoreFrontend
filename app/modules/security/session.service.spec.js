'use strict';

 describe('Service: sessionService', function() {

     var mockRequestInterceptor, mock$state, mockEvent;

     beforeEach(module('aStoreFrontend', function($provide) {
         $provide.value('$log', console);

         mockRequestInterceptor = {
             setToken: function() {}
         };
         $provide.value('requestInterceptor', mockRequestInterceptor);

         mock$state = {
             go: function() {},
             get: function() {return 'route';}
         };
         $provide.value('$state', mock$state);
     }));

     var service, $rootScope, $log, $state;

     beforeEach(inject(function(_$rootScope_, _$log_, _sessionService_, _$state_) {
         $rootScope = _$rootScope_;
         $log = _$log_;
         $state = _$state_;
         service = _sessionService_;

         mockEvent = {
         	preventDefault: function() {}
         };
         
         spyOn(mockRequestInterceptor, 'setToken');
         spyOn(mock$state, 'go');
         spyOn(mockEvent, 'preventDefault');
     }));

     it('should have service be defined...', function() {
         expect(service).toBeDefined();
     });

     it('should create controller...', function() {
         var someToken = 'token';
         var someUserRoles = ['a', 'b'];
         service.create(someToken, someUserRoles);
         expect(mockRequestInterceptor.setToken).toHaveBeenCalledWith(someToken);
         expect(service.getToken()).toBe(someToken);
         expect(service.getUserRoles()).toBe(someUserRoles);
     });

     it('should destroy controller...', function() {
         var someToken = 'token';
         var someUserRoles = ['a', 'b'];
         service.create(someToken, someUserRoles);
         service.destroy();
         expect(mockRequestInterceptor.setToken).toHaveBeenCalledWith(null);
         expect(service.getToken()).toBeNull();
         expect(service.getUserRoles()).toBeNull();
     });

     it('should getToken...', function() {
         expect(service.getToken()).toBeNull();
         var someToken = '123';
         service.create(someToken, null);
         expect(service.getToken()).toBe(someToken);
     });

     it('should getUserRoles...', function() {
         expect(service.getUserRoles()).toBeNull();
         var someUserRoles = ['1', '2', '3'];
         service.create(null, someUserRoles);
         expect(service.getUserRoles()).toBe(someUserRoles);
     });

     it('should isAuthenticated...', function() {
         expect(service.isAuthenticated()).toBeFalsy();
         service.create('1', []);
         expect(service.isAuthenticated()).toBeTruthy();
     });

     it('should is isAuthorized...', function() {
         var someToken = 'token';
         var someUserRoles = ['role1', 'role2'];
         service.create(someToken, someUserRoles);
         var fakeRole = 'fakeRole';
         expect(service.isAuthorized(fakeRole)).toBeFalsy();
         expect(service.isAuthorized([fakeRole])).toBeFalsy();
         var rightRole = 'role1';
         expect(service.isAuthorized(rightRole)).toBeTruthy();
         expect(service.isAuthorized([rightRole])).toBeTruthy();
     });

     it('should checkAccess...', function() {
         var myToState = {};
         var myFromState = 'fromState';
         var myFromParams = 'fromParams';
         var res = service.checkAccess(mockEvent, myToState, null, myFromState, myFromParams);
         expect(mockEvent.preventDefault).not.toHaveBeenCalled();
         expect(mock$state.go).not.toHaveBeenCalled();

         myToState.data = 'data';
         expect(service.isAuthenticated()).toBeFalsy();
         res = service.checkAccess(mockEvent, myToState, null, myFromState, myFromParams);
         expect(mockEvent.preventDefault).toHaveBeenCalled();
         expect(mock$state.go).toHaveBeenCalledWith('login');
         mockEvent.preventDefault.calls.reset();
         mock$state.go.calls.reset();

         var someToken = 'token';
         var someUserRoles = ['role1', 'role2'];
         service.create(someToken, someUserRoles);
         res = service.checkAccess(mockEvent, myToState, null, myFromState, myFromParams);
         expect(mockEvent.preventDefault).toHaveBeenCalled();
         expect(mock$state.go).toHaveBeenCalledWith('accessDenied');
         mockEvent.preventDefault.calls.reset();
         mock$state.go.calls.reset();

         myToState.data = {};
         myToState.data.rolesAllowed = 'role1';
         res = service.checkAccess(mockEvent, myToState, null, myFromState, myFromParams);
         expect(mockEvent.preventDefault).not.toHaveBeenCalled();
         expect(mock$state.go).not.toHaveBeenCalled();
     });

     it('should goHome...', function() {
         service.goHome();
         expect(mock$state.go).toHaveBeenCalledWith('route');
     });

     it('should goForward...', function() {
     	var myToState = {};
     	var myFromState = {};
     	var myFromParams = {};
     	service.checkAccess(mockEvent, myToState, null, null, null);
     	service.goForward();
     	expect(mock$state.go).not.toHaveBeenCalled();

     	myFromState.url = 'url';
     	service.checkAccess(mockEvent, myToState, null, myFromState, myFromParams);
     	service.goForward();
     	expect(mock$state.go).toHaveBeenCalledWith(myFromState);
     	mock$state.go.calls.reset();

     	myToState.data = 'data';
     	service.checkAccess(mockEvent, myToState, null, myFromState, null);
     	service.goForward();
     	expect(mock$state.go).toHaveBeenCalledWith(myToState);
     });

     it('should goBack...', function() {
     	var myToState = {};     	
     	var myFromState = {};
     	var myFromParams = {};

     	myFromState.url = '';
     	service.checkAccess(mockEvent, myToState, null, myFromState, myFromParams)
     	;
     	service.goBack();
     	expect(mock$state.go).toHaveBeenCalledWith(myFromState);
     	mock$state.go.calls.reset();
     	
     	myFromState.url = '^';
     	service.checkAccess(mockEvent, myToState, null, myFromState, myFromParams);
     	service.goBack();
     	 expect(mock$state.go).toHaveBeenCalledWith('route');
     	mock$state.go.calls.reset();

     	myFromState.url = '';
     	myFromParams.param = '';
     	service.checkAccess(mockEvent, myToState, null, myFromState, myFromParams);
     	service.goBack();
     	expect(mock$state.go).toHaveBeenCalledWith(myFromState, myFromParams);
     });

     it('should getToStateUrl...', function() {
        var myToState = {};         
        var myFromState = {};
        var myFromParams = {};
        myFromState.url = 'fromUrl';

        service.checkAccess(mockEvent, myToState, null, myFromState, myFromParams)
        ;
        expect(service.getToStateUrl()).toBe(myFromState.url);

        myToState.data = '';
        myToState.url = 'toUrl';
        service.checkAccess(mockEvent, myToState, null, myFromState, myFromParams)
        ;
        expect(service.getToStateUrl()).toBe(myToState.url);
     }); 
 });

