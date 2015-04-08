'use strict';

function authService($http, $q, $log, $window, $state, SESSION_STORAGE, REST, sessionService, asmCrypto) {

    function login(credentials, salt) {
        var deferred = $q.defer();
        var authInfo = {};
        authInfo.username = credentials.username;
        authInfo.password = asmCrypto.HMAC_SHA256.hex(credentials.password, salt);
        credentials.username = null;
        credentials.password = null;
        $http.post(REST.fullUrl + '/user/login', authInfo, {
            timeout: REST.timeout
        })
            .success(function(data) {
                deferred.resolve(data.token);
                sessionService.create(data.token, data.permissionsSet);
                $window.sessionStorage[SESSION_STORAGE.authData] = JSON.stringify(data);
            })
            .error(function(data, status) {
                deferred.reject(status);
            });
        return deferred.promise;
    }

    function logout() {
        sessionService.destroy();
        $window.sessionStorage.removeItem(SESSION_STORAGE.authData);
    }

    function init() {
        var authDataString = $window.sessionStorage[SESSION_STORAGE.authData];
        if (authDataString) {
            var authData = JSON.parse(authDataString);
            sessionService.create(authData.token, authData.permissionsSet);
        }
    }

    init();

    var service = {
        login: login,
        logout: logout
    };
    return service;
}

angular
    .module('aStoreFrontend')
    .factory('authService', authService);