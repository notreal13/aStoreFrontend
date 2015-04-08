'use strict';

function configOrderController($stateProvider) {
  $stateProvider
    .state('order', {
      url: '/order',
      templateUrl: 'modules/order/order.html',
      controller: 'OrderController',
      controllerAs: 'order'
    });
}

function OrderController(orderService) {
  var vm = this;

  vm.allOrders = orderService.query();
  vm.selectedOrder = null;

  vm.selectOrder = function(selectedOrder) {
    if (vm.selectedOrder === selectedOrder) {
      vm.selectedOrder = null;
    } else {
      vm.selectedOrder = selectedOrder;
    }
  };
}

angular.module('myOrder', [])
  .config(configOrderController)
  .controller('OrderController', OrderController);