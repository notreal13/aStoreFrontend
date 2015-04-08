'use strict';

function configCheckoutController($stateProvider) {
    $stateProvider
        .state('checkout', {
            url: '/checkout',
            templateUrl: 'modules/checkout/checkout.html',
            controller: 'CheckoutController',
            controllerAs: 'checkout'
        });
}

function CheckoutController($scope, $state, $log, cartService, checkoutService, sessionService, userService) {
    var vm = this;

    vm.subtotal = cartService.getTotal();
    vm.surcharge = 0;
    vm.total = vm.surcharge + parseFloat(cartService.getTotal());

    vm.submitPurchase = function() {
        var promise = checkoutService.submit(vm.purchase);
        promise
            .then(
                function(data) {
                    cartService.removeAll();
                    vm.orderId = data.orderId;
                }, function(data) {
                    // submit failed
                    $log.log('status: ' + data.status);
                    $log.log('data: ' + data.data);
                });
    };

    vm.cancelPurchase = function() {
        sessionService.goBack();
    };

    vm.startShoppingAgain = function() {
        sessionService.goHome();
    };

    vm.initForm = function() {
        if (sessionService.isAuthenticated()) {
            var user = userService.get();
            user.$promise.then(function() {
                vm.purchase = {};
                vm.purchase.email = user.username;
                vm.purchase.firstName = user.firstName;
                vm.purchase.lastName = user.lastName;
                vm.purchase.phone = user.phone;
            });
        }
    };

    vm.initForm();
}

angular.module('myCheckout', [])
    .config(configCheckoutController)
    .controller('CheckoutController', CheckoutController);