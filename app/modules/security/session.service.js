'use strict';

function sessionService($log, $state, requestInterceptor) {

    var token = null;
    var userRoles = null;

    var myToState;
    var myFromState;
    var myFromParams;

    function create(someToken, someUserRoles) {
        token = someToken;
        if (angular.isArray(someUserRoles)) {
            userRoles = someUserRoles;
        } else {
            userRoles = [someUserRoles];
        }
        userRoles = someUserRoles;
        requestInterceptor.setToken(token);
    }

    function destroy() {
        token = null;
        userRoles = null;
        requestInterceptor.setToken(token);
    }

    function getToken() {
        return token;
    }

    function getUserRoles() {
        return userRoles;
    }

    function isAuthenticated() {
        return token !== null;
    }

    function isAuthorized(authorizedRoles) {
        function isRoleAllowed(role) {
            return userRoles.indexOf(role) !== -1;
        }

        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }

        return (isAuthenticated() &&
            authorizedRoles.some(isRoleAllowed));
    }

    function checkAccess(event, toState, toParams, fromState, fromParams) {
        myFromState = fromState;
        myFromParams = fromParams;
        if (toState.data !== undefined) {
            if (!isAuthenticated()) {
                myToState = toState;
                event.preventDefault();
                $state.go('login');
            } else {
                if (!isAuthorized(toState.data.rolesAllowed)) {
                    myToState = toState;
                    event.preventDefault();
                    $state.go('accessDenied');
                }
            }
        }
    }

    function goHome() {
        $state.go('route');
    }

    function goForward() {
        if (myToState) {
            $state.go(myToState);
        } else {
            // can't go to forward, so go back!
            goBack();
        }
    }

    function goBack() {
        if (myFromState) {
            if (myFromState.url === '^') {
                myFromState = $state.get('route');
            }
            if (Object.keys(myFromParams).length === 0) {
                $state.go(myFromState);
            } else {
                $state.go(myFromState, myFromParams);
            }
        }
    }

    function getToStateUrl() {
        if (myToState) {
            return myToState.url;
        } else {
            return myFromState.url;

        }
    }

    var service = {
        create: create,
        destroy: destroy,
        getToken: getToken,
        getUserRoles: getUserRoles,
        isAuthenticated: isAuthenticated,
        isAuthorized: isAuthorized,
        checkAccess: checkAccess,
        goHome: goHome,
        goForward: goForward,
        goBack: goBack,
        getToStateUrl: getToStateUrl
    };
    return service;
}

angular
    .module('aStoreFrontend')
    .service('sessionService', sessionService);