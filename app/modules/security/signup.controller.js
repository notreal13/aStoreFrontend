'use strict';

function configSignupController($stateProvider) {
    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: 'modules/security/signup.html',
            controller: 'SignupController',
            controllerAs: 'signup'
        });
}

function SignupController($scope, $log, $interval, signupService, sessionService) {
    var vm = this;

    $('input[name="username"]').focus();

    vm.user = {};
    vm.msg = {};

    var timer;

    vm.countdown = function() {
        timer = $interval(function() {
            vm.counter--;
            if (vm.counter > 0) {
                vm.countdown();
            } else {
                vm.cancel();
            }
        }, 1000);
    };

    vm.signup = function() {
        var promise = signupService.signup(vm.user);
        promise
            .then(
                function(salt) {
                    return signupService.setPassword(vm.user.username, vm.user.password, salt);
                })
            .then(
                function() {
                    vm.msg.success = 'Signup success. Redirecting...';
                    vm.counter = 5;
                    vm.countdown();
                },
                function(result) {
                    $log.log('signup error ' + result);
                });
    };

    vm.cancel = function() {
        sessionService.goBack();
    };

    vm.stopCountdown = function() {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
    };

    $scope.$on('$destroy', function() {
        // make sure that the interval is destoryed too
        vm.stopCountdown();
    });
}

angular.module('mySignup', [])
    .config(configSignupController)
    .controller('SignupController', SignupController);