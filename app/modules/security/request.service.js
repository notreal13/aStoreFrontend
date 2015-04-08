'use strict';

angular
    .module('myRequestInterceptor', ['ngResource'])
    .service('requestInterceptor', function() {

        var token = null;

        var setToken = function setToken(someToken) {
            token = someToken;
        };

        var getToken = function getToken() {
            return token;
        };

        var request = function request(config) {
            if (token) {
                config.headers['aStore-auth-token'] = token;
            }
            return config;
        };

        return {
            setToken: setToken,
            getToken: getToken,
            request: request
        };
    })

    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('requestInterceptor');
    }]);
