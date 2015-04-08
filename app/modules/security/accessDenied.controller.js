'use strict';

function configAccessDeniedController($stateProvider) {
  $stateProvider
    .state('accessDenied', {
      url: '/accessDenied',
      templateUrl: 'modules/security/accessDenied.html',
      controller: 'AccessDeniedController',
      controllerAs: 'accessDenied'
    });
}

function AccessDeniedController($log, sessionService) {
  var vm = this;

  vm.goBack = sessionService.goBack;

  vm.resName = sessionService.getToStateUrl();
}

angular.module('myAccessDenied', [])
  .config(configAccessDeniedController)
  .controller('AccessDeniedController', AccessDeniedController);