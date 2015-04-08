'use strict';

angular
    .module('aStoreFrontend')
    .factory('categoryService', function($resource, REST) {
        return $resource(REST.baseUrl + '/category', {
            port: REST.port
        });
    });