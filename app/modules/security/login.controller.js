'use strict';

function configLoginController($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'modules/security/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    });
}

function LoginController($rootScope, $log, sessionService, authService, saltService, userService, AUTH_EVENTS) {
  var vm = this;

  $('input[name="username"]').focus();

  vm.msg = {};

  vm.credentials = {
    username: '',
    password: ''
  };

  vm.logout = function() {
    authService.logout();
    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
  };

  vm.login = function() {
    vm.msg = {};
    var promise = saltService.getSalt(vm.credentials.username);
    promise
      .then(
        function(salt) {
          return authService.login(vm.credentials, salt);
        })
      .then(
        function() {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          vm.userInfo = userService.get();
          sessionService.goForward();
        },
        function(result) {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          if (result === 401) {
            vm.msg.error = 'Invalid login / password';
          } else {
            vm.msg.error = 'Account not activated';
          }
        });
  };

  vm.cancel = sessionService.goBack;
}

angular.module('myLogin', [])
  .config(configLoginController)
  .controller('LoginController', LoginController);