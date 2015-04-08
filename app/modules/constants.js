'use strict';

angular
  .module('aStoreFrontend')
  .constant('REST', (function() {
    var host = 'http://localhost';
    var port = 8080;
    var restUrl = 'rest';
    var timeout = 5000;
    return {
      'port': port,
      'baseUrl': host + '\::port/' + restUrl,
      'fullUrl': host + ':' + port + '/' + restUrl,
      'timeout': timeout
    };
  })())
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    user: 'user',
    guest: 'guest'
  })
  .constant('SESSION_STORAGE', {
    authData: 'aStoreFrontend.data',
    cart: 'aStoreFrontend.cart'
  });