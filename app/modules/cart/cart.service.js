'use strict';

function cartService($window, $log, SESSION_STORAGE) {

    var ShoppingCart = {};
    var ShoppingCartListeners = [];

    var ShoppingCartString = $window.sessionStorage[SESSION_STORAGE.cart];
    if (ShoppingCartString) {
        ShoppingCart = JSON.parse(ShoppingCartString);
    } else {
        ShoppingCart.routeId = 0;
        ShoppingCart.tickets = [];
    }

    function setRouteId(routeId) {
        ShoppingCart.routeId = routeId;
    }

    function getRouteId() {
        return ShoppingCart.routeId;
    }

    function add(ticket) {
        var days = [];
        for (var i = 1; i <= 31; i++) {
            days.push(i);
        }
        ticket.days = days;

        // dob.year = 1999;
        // var month = {};
        // month.number = 1;
        // month.name = 'January';
        // dob.month = month;
        // dob.day = 1;
        // ticket.dob = dob;
        // ticket.dobString = ticket.dob.year + '.' + ticket.dob.month.number + '.' + ticket.dob.day;
        ticket.number = getSize();
        ShoppingCart.tickets.push(angular.copy(ticket));
        fireChanges();
    }

    function remove(ticket) {
        for (var i = 0; i < ShoppingCart.tickets.length; i++) {
            if (angular.equals(ShoppingCart.tickets[i], ticket)) {
                ShoppingCart.tickets.splice(i, 1);
                fireChanges();
                return;
            }
        }
    }

    function removeAll() {
        ShoppingCart.tickets = [];
        fireChanges();
    }

    function getSize() {
        return ShoppingCart.tickets.length;
    }

    function getTickets() {
        return ShoppingCart.tickets;
    }

    function getOrderedTicketList() {
        var orderedTicketList = [];
        for (var i = 0; i < ShoppingCart.tickets.length; i++) {
            var orderedTicket = {};
            var ticket = {};
            var category = {};
            var supportingDocument = {};
            category.id = ShoppingCart.tickets[i].category.id;
            category.name = ShoppingCart.tickets[i].category.name;

            ticket.id = ShoppingCart.tickets[i].id;
            ticket.name = ShoppingCart.tickets[i].name;
            ticket.price = ShoppingCart.tickets[i].price;
            ticket.category = category;

            supportingDocument.id = ShoppingCart.tickets[i].supportingDocument.id;

            orderedTicket.ticket = ticket;
            orderedTicket.firstName = ShoppingCart.tickets[i].firstName;
            orderedTicket.lastName = ShoppingCart.tickets[i].lastName;
            orderedTicket.middleName = ShoppingCart.tickets[i].middleName;
            orderedTicket.dobString = ShoppingCart.tickets[i].dobString;
            orderedTicket.supportingDocumentData = ShoppingCart.tickets[i].supportingDocumentData;
            orderedTicket.supportingDocument = supportingDocument;
            orderedTicket.licensePlate = ShoppingCart.tickets[i].licensePlate;
            orderedTicketList.push(orderedTicket);
        }
        return orderedTicketList;
    }

    function getTotal() {
        var total = 0;
        for (var i = 0; i < ShoppingCart.tickets.length; i++) {
            total += ShoppingCart.tickets[i].price;
        }
        return total.toFixed(2);
    }

    function addListener(listener) {
        ShoppingCartListeners.push(listener);
    }

    function fireChanges() {
        for (var i = 0; i < ShoppingCartListeners.length; i++) {
            ShoppingCartListeners[i].call();
        }
        $window.sessionStorage[SESSION_STORAGE.cart] = JSON.stringify(ShoppingCart);
    }

    var service = {
        setRouteId: setRouteId,
        getRouteId: getRouteId,
        add: add,
        remove: remove,
        removeAll: removeAll,
        getSize: getSize,
        getTickets: getTickets,
        getOrderedTicketList: getOrderedTicketList,
        getTotal: getTotal,
        addListener: addListener,
        fireChanges: fireChanges
    };
    return service;
}

angular
    .module('aStoreFrontend')
    .factory('cartService', cartService);