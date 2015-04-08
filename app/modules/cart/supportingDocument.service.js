'use strict';

angular
    .module('aStoreFrontend')
    .factory('supportingDocumentService', function($resource, REST) {
        return $resource(REST.baseUrl + '/document/:id', {
        	id: '@_id',
            port: REST.port
        }, {
        	'update': {
        		method: 'PUT'
        	}
        });
    });