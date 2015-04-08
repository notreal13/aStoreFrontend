'use strict';

angular
    .module('aStoreFrontend')
    .factory('orderService', function($resource, REST) {
        return $resource(REST.baseUrl + '/order', {
            port: REST.port
        });
    });
