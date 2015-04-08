'use strict';

angular
  .module('aStoreFrontend')
  .factory('purchaseService', function($resource, REST) {
    return $resource(REST.baseUrl + '/purchase', {
      port: REST.port
    });
  });