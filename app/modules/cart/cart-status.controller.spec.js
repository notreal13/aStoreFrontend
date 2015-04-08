'use strict';

describe('Controller: CartStatusController', function() {

  var mockCartService;

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);

    mockCartService = {
      getSize: function() {
        return 0;
      },
      addListener: function() {}
    };
    $provide.value('cartService', mockCartService);

  }));

  var ctrl, $scope, $rootScope, $controller, $log;

  beforeEach(inject(function(_$rootScope_, _$controller_, _$log_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $log = _$log_;

    spyOn(mockCartService, 'addListener').and.callThrough();

    $scope = $rootScope.$new();
    ctrl = $controller('CartStatusController', {
      '$scope': $scope
    });

  }));

  it('should have controller be defined...', function() {
    expect(ctrl).toBeDefined();
  });

  it('should call add listener...', function() {
    expect(mockCartService.addListener).toHaveBeenCalled();
  });

  it('should have content EMPTY on size = 0...', function() {
    spyOn(mockCartService, 'getSize').and.returnValue(0);

    $scope = $rootScope.$new();
    ctrl = $controller('CartStatusController', {
      '$scope': $scope
    });

    expect(mockCartService.getSize).toHaveBeenCalled();
    expect(ctrl.size).toEqual(0);
    expect(ctrl.content).toEqual('EMPTY');
  });

  it('should have content FULL on size > 0...', function() {
    spyOn(mockCartService, 'getSize').and.returnValue(1);

    $scope = $rootScope.$new();
    ctrl = $controller('CartStatusController', {
      '$scope': $scope
    });

    expect(mockCartService.getSize).toHaveBeenCalled();

    expect(ctrl.size).toEqual(1);
    expect(ctrl.content).toEqual('FULL');
  });

});