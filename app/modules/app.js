'use strict';

/**
 * @ngdoc overview
 * @name aStoreFrontend
 * @description
 * # aStoreFrontend
 *
 * Main module of the application.
 */

angular
  .module('aStoreFrontend', [
    'ngResource',
    'gettext',
    'tmh.dynamicLocale',
    'ui.grid',
    'ui.grid.cellNav',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.pagination',
    'ui.grid.resizeColumns',
    'ui.router',
    'myMatchDirective',
    'myApp',
    'myRequestInterceptor',
    'myCart',
    'myCartStatus',
    'myCategory',
    'myCheckout',
    'myLogin',
    'myOrder',
    'myRoute',
    'mySignup',
    'myTicket',
    'myAdmin',
    'myAccessDenied',
    'myInfoAdmin',
    'myTicketAdmin',
    'mySupportingDocumentAdmin'
  ])
  .config(function($locationProvider,/* $stateProvider, $urlRouterProvider, */tmhDynamicLocaleProvider) {
    $locationProvider.html5Mode(true);
      // $urlRouterProvider.otherwise('/route');
      
      // $locationProvider.hashPrefix('!');
          // $stateProvider
          //         // .state('route', {
          //         //     url: '/route',
          //         //     templateUrl: 'modules/route/route.html',
          //         //     controller: 'RouteController',
          //         //     controllerAs: 'route'
          //         // })        
          //         .state('xxx', {
          //             url: '/xxx',
          //             templateUrl: 'modules/xxx/xxx.html',
          //             controller: 'XxxController',
          //             controllerAs: 'xxx'
          //         })        
          //         .state('state1', {
          //             url: '/state1',
          //             templateUrl: 'modules/xxx/state1.html'
          //     });    
          // $routeProvider
          //     .otherwise({
          //         redirectTo: '/route'
          //     });
          tmhDynamicLocaleProvider.localeLocationPattern('https://code.angularjs.org/1.3.8/i18n/angular-locale_{{locale}}.js');
      });
