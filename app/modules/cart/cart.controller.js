'use strict';

function configCartController($stateProvider) {
  $stateProvider
    .state('cart', {
      url: '/cart',
      templateUrl: 'modules/cart/cart.html',
      controller: 'CartController',
      controllerAs: 'cart'
    });
}

function CartController($filter, cartService, supportingDocumentService, sessionService) {
  var vm = this;

  vm.allSupportingDocuments = supportingDocumentService.query();

  var currentDate = new Date();

  var years = [];
  for (var i = currentDate.getFullYear() - 100; i < currentDate.getFullYear(); i++) {
    years.push(i);
  }
  var months = [];
  for (i = 1; i < 13; i++) {
    var month = {};
    month.number = i;
    var dt = new Date(1, i - 1, 1);
    month.name = $filter('date')(dt, 'MMMM');
    months.push(month);
  }
  vm.years = years;
  vm.months = months;

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  vm.updateDob = function(ticket) {
    if (ticket.dob.month && ticket.dob.year) {
      var days = [];
      for (var i = 1; i <= daysInMonth(ticket.dob.month.number, ticket.dob.year); i++) {
        days.push(i);
      }
      ticket.days = days;
      // if (ticket) {
        ticket.dobString = ticket.dob.year + '.' + ticket.dob.month.number + '.' + ticket.dob.day;
      // }
    }
  };

  vm.remove = function(ticket) {
    cartService.remove(ticket);
    updateScope();
  };

  vm.removeAll = function() {
    cartService.removeAll();
    updateScope();
    sessionService.goHome();
  };

  vm.continueShopping = function() {
    sessionService.goHome();
  };

  function updateScope() {
    vm.tickets = cartService.getTickets();
    vm.total = cartService.getTotal();
    // уходим из корзины раз там пусто
    if (cartService.getSize() === 0) {
      sessionService.goHome();
    }
  }

  updateScope();
}

angular.module('myCart', [])
  .config(configCartController)
  .controller('CartController', CartController);