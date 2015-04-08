'use strict';

function CartStatusController(cartService) {
  var vm = this;

  // scope update:
  function updateCartContentScope() {
    vm.size = cartService.getSize();
    if (vm.size === 0) {
      vm.content = 'EMPTY';
    } else {
      vm.content = 'FULL';
    }
  }

  // listener on the cart content
  cartService.addListener(function() {
    updateCartContentScope();
  });

  updateCartContentScope();
}

angular.module('myCartStatus', [])
  .controller('CartStatusController', CartStatusController);