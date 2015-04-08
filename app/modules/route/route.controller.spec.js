'use strict';

describe('Controller: RouteController', function() {
  var mockRouteService, mockCartService;

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);

    mockRouteService = {
      query: function() {}
    };
    $provide.value('routeService', mockRouteService);

    mockCartService = {
      setRouteId: function() {}
    };
    $provide.value('cartService', mockCartService);

  }));

  var ctrl, $scope, $log;

  beforeEach(inject(function($rootScope, $controller, _$log_) {
    $log = _$log_;

    spyOn(mockRouteService, 'query').and.returnValue([{}]);

    $scope = $rootScope.$new();
    ctrl = $controller('RouteController', {
      '$scope': $scope
    });

  }));

  it('should have controller be defined...', function() {
    expect(ctrl).toBeDefined();
  });

  it('should init ctrl...', function() {
    expect(mockRouteService.query).toHaveBeenCalled();
    expect(ctrl.allRoutes).toBeDefined();
  });

  it('should click on route 2...', function() {
    spyOn(mockCartService, 'setRouteId');
    ctrl.clickRouteId(2);
    expect(mockCartService.setRouteId).toHaveBeenCalledWith(2);
  });

});