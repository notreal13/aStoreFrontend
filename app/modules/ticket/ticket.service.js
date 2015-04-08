'use strict';

angular
    .module('aStoreFrontend')
    .factory('ticketService', function($resource, REST) {
        return $resource(REST.baseUrl + '/ticket/:id', {
            id: '@_id',
            port: REST.port
        }, {
            'update': {
                method: 'PUT'
            }
        });
    })
    .factory('ticketByCategoryService', function($resource, REST) {
        return $resource(REST.baseUrl + '/ticket/category/:categoryId', {
            categoryId: '@categoryId',
            port: REST.port
        });
    });