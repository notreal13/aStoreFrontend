'use strict';

function matchDirective() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
          matchX: '=match'
        },
        link: function(scope, elem, attrs, ctrl) {
            function getMatchValue() {

              var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;
              // console.log('getMatchValue ' + modelValue);              
              // console.log('matchX ' + scope.matchX);
              return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.matchX === modelValue;
            }

            scope.$watch(getMatchValue, function(result) {
                ctrl.$setValidity('match', result);
            });
        }
    };
}

angular
    .module('myMatchDirective', [])
    .directive('match', matchDirective);
