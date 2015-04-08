'use strict';

describe('Controller: InfoAdminController', function() {
  var mockAdminService, $stateProvider;

  beforeEach(module('aStoreFrontend', function($provide, _$stateProvider_) {
    $stateProvider = _$stateProvider_;
    $provide.value('$log', console);

    mockAdminService = {
      clean: function() {},
      getMessage: function() {},
      module: {
        name: 'test'
      }
    };
    $provide.value('adminService', mockAdminService);

  }));

  var ctrl, $scope, $log, $state, $rootScope, $httpBackend;

  beforeEach(inject(function(_$rootScope_, $controller, _$log_, _$state_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $log = _$log_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;

    $httpBackend.whenGET('modules/route/route.html').respond(); 
    $httpBackend.whenGET('modules/admin/admin.html').respond();
    $httpBackend.whenGET('modules/admin/infoAdmin.html').respond();

    var msg = {};
    msg.text = '';
    msg.adv = '';
    spyOn(mockAdminService, 'getMessage').and.returnValue(msg);    

    $scope = $rootScope.$new();
    ctrl = $controller('InfoAdminController', {
      '$scope': $scope
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have controller be defined...', function() {
    expect(ctrl).toBeDefined();
    $httpBackend.flush();
  });

  it('should init ctrl...', function() {
    expect(ctrl.msg.text).toBe('');
    expect(ctrl.msg.adv).toBe('');
    expect(ctrl.mod.name).toBe('test');
    $httpBackend.flush();
  });

  it('should have rolesAllowed in data', function() {
    $rootScope.$digest();
    $state.go('admin.infoAdmin').then(function() {
        expect($state.current.data).toBeTruthy();
        expect($state.current.data.rolesAllowed).toBeTruthy();
        expect($state.current.data.rolesAllowed.length > 0).toBeTruthy();
    });
    $httpBackend.flush();
  });

});


