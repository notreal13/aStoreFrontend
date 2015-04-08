'use strict';

function MainController($rootScope, $scope, $log, gettextCatalog, tmhDynamicLocale, userService, sessionService, authService, USER_ROLES, AUTH_EVENTS) {
  // gettextCatalog.debug = true;
  
  var vm = this;

  var languages = [
    {
      id: 'ru',
      name: 'русский'
    },
    {
      id: 'en',
      name: 'english'
    }
  ];

  vm.languages = languages;

  vm.selectedLanguage = languages[0];
  vm.isAuthorized = sessionService.isAuthorized;
  vm.isAuthenticated = false;
  vm.userInfo = null;

  function getUserInfo() {
    vm.isAuthenticated = sessionService.isAuthenticated();    
    if (!!vm.isAuthenticated) {
      vm.userInfo = userService.get();
    } else {
      vm.userInfo = null;
    }
  }

  $scope.$on(AUTH_EVENTS.loginSuccess, getUserInfo);

  $scope.$on(AUTH_EVENTS.logoutSuccess, getUserInfo);

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    sessionService.checkAccess(event, toState, toParams, fromState, fromParams);
  });

  vm.test = sessionService.goForward;

  vm.logout = function() {
    authService.logout();
    getUserInfo();
  };

  vm.translate = function(language) {
    var i = languages.indexOf(language);
    vm.selectedLanguage = languages[i];
    gettextCatalog.setCurrentLanguage(language.id);
    tmhDynamicLocale.set(language.id);
  };

  vm.translate(vm.selectedLanguage);
  getUserInfo();
}

angular
  .module('myApp', [])
  .controller('MainController', MainController)
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/route');
  });