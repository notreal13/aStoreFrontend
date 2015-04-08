'use strict';

describe('Controller: OrderController', function() {
  var mockOrderService;

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);

    mockOrderService = {
      query: function() {}
    };
    $provide.value('orderService', mockOrderService);
  }));

  var ctrl, $scope, $log;

  beforeEach(inject(function($rootScope, $controller, _$log_) {
    $log = _$log_;

    spyOn(mockOrderService, 'query').and.returnValue([{}]);

    $scope = $rootScope.$new();
    ctrl = $controller('OrderController', {
      '$scope': $scope
    });

  }));

  it('should have controller be defined...', function() {
    expect(ctrl).toBeDefined();
  });

  it('should init ctrl...', function() {
    expect(mockOrderService.query).toHaveBeenCalled();
    expect(ctrl.allOrders.length).toEqual(1);        
  });  

  it('should select order...', function() {
    expect(ctrl.selectedOrder).toBeNull();
    var order = 'someOrder';
    ctrl.selectOrder(order);
    expect(ctrl.selectedOrder).toBe(order);
  });

  it('should deselect order...', function() {
    expect(ctrl.selectedOrder).toBeNull();
    var order = 'someOrder';
    ctrl.selectOrder(order);
    expect(ctrl.selectedOrder).toBe(order);
    ctrl.selectOrder(order);
    expect(ctrl.selectedOrder).toBeNull();
  });

});