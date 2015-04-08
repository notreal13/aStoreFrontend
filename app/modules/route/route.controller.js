'use strict';

function configRouteController($stateProvider) {
  $stateProvider
        .state('route', {
            url: '/route',
            templateUrl: 'modules/route/route.html',
            controller: 'RouteController',
            controllerAs: 'route',
        });
}

function RouteController(routeService, cartService) {
  var vm = this;
  vm.allRoutes = routeService.query();

  vm.clickRouteId = function(routeId) {
    cartService.setRouteId(routeId);
  };
}

angular.module('myRoute', [])
  .config(configRouteController)
  .controller('RouteController', RouteController);