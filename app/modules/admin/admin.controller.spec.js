'use strict';

describe('Controller: AdminController', function() {
  var mockAdminService;

  beforeEach(module('aStoreFrontend', function($provide) {
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

  var ctrl, $scope, $log;

  beforeEach(inject(function($rootScope, $controller, _$log_) {
    $log = _$log_;

    var msg = {};
    msg.text = '';
    msg.adv = '';
    spyOn(mockAdminService, 'getMessage').and.returnValue(msg);

    $scope = $rootScope.$new();
    ctrl = $controller('AdminController', {
      '$scope': $scope
    });

  }));

  it('should have controller be defined...', function() {
    expect(ctrl).toBeDefined();
  });

  it('should init ctrl...', function() {
    expect(ctrl.msg.text).toBe('');
    expect(ctrl.msg.adv).toBe('');
    expect(ctrl.mod.name).toBe('test');
  });

});