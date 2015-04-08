'use strict';

function configTicketController($stateProvider) {
  $stateProvider
        .state('ticket', {
            url: '/ticket/:categoryId',
            templateUrl: 'modules/ticket/ticket.html',
            controller: 'TicketController',
            controllerAs: 'ticket'
        });  
}

function TicketController($stateParams, $state, ticketByCategoryService, cartService) {
  var vm = this;

  vm.allTickets = ticketByCategoryService.query({
    categoryId: $stateParams.categoryId
  });

  vm.addToCart = function(ticket) {
    cartService.add(ticket);
  };

  vm.goBack = function() {
    $state.go('category');
  };
}

angular.module('myTicket', [])
  .config(configTicketController)
  .controller('TicketController', TicketController);