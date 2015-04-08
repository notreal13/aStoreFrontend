'use strict';

function signupService($http, $q, $log, REST, asmCrypto) {

    function signup(user) {
        var newUser = {};
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.username = user.username;
        newUser.phone = user.phone;

        var deferred = $q.defer();

        $http.post(REST.fullUrl + '/user/signup', newUser, {
            timeout: REST.timeout
        })
            .success(function(data) {
                deferred.resolve(data.salt);
            })
            .error(function(data, status) {
                deferred.reject(status);
            });
        return deferred.promise;    
    } 

    function setPassword(username, password, salt) {
        var deferred = $q.defer();
        var hashPassword = asmCrypto.HMAC_SHA256.hex(password, salt);
        var authInfo = {
            username: username,
            password: hashPassword
        };

        $http.post(REST.fullUrl + '/user/password', authInfo, {
            timeout: REST.timeout
        })
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(data, status) {
                deferred.reject(status);
            });
        return deferred.promise;    
    }           

    var service = {
        signup: signup,
        setPassword: setPassword
    };
    return service;
}

angular
    .module('aStoreFrontend')
    .factory('signupService', signupService);
