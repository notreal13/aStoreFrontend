'use strict';

angular
  .module('aStoreFrontend')
  .factory('userService', function($resource, REST) {
    return $resource(REST.baseUrl + '/user/info', {
      port: REST.port
    });
  });    
