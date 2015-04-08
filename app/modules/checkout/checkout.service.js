'use strict';

function checkoutService($resource, $log, REST, cartService) {
    function submit(purchase) {
        
        var Purchase = $resource(REST.baseUrl + '/purchase', {
            port: REST.port
        });

        var newPurchase = new Purchase();
        newPurchase.firstName = purchase.firstName;
        newPurchase.lastName = purchase.lastName;
        newPurchase.email = purchase.email;
        newPurchase.phone = purchase.phone;
        newPurchase.route = {};
        var route = {};
        route.id = cartService.getRouteId();
        newPurchase.route = route;

        var orderedTicketList = cartService.getOrderedTicketList();
        newPurchase.orderedTicketList = orderedTicketList;
        return newPurchase.$save();
    }

    var service = {
        submit: submit
    };
    return service;
}
angular
    .module('aStoreFrontend')
    .factory('checkoutService', checkoutService);