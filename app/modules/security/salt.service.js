'use strict';

function saltService($http, $q, $log, $timeout, REST) {

    function getSalt(username) {
        var deferred = $q.defer();


        $http.get(REST.fullUrl + '/user/salt', {
            params: {
                username: username
                },
            timeout : REST.timeout
            })
            .success(function(data) {
                deferred.resolve(data.salt);
            })
            .error(function(data, status) {
                deferred.reject(status);
            });
        return deferred.promise;
    }

    var service = {
        getSalt: getSalt,
    };
    return service;

}

angular
    .module('aStoreFrontend')
    .factory('saltService', saltService);