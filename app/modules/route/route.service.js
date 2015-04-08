'use strict';

angular
  .module('aStoreFrontend')
  .factory('routeService', function($resource, REST) {
    return $resource(REST.baseUrl + '/route', {
      port: REST.port
    });
  });