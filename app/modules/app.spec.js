'use strict';

describe('aStoreFrontend', function() {

    beforeEach(module('aStoreFrontend', function($provide) {
        $provide.value('$log', console);
    }));

    var $scope, $log, $location;

    beforeEach(inject(function($rootScope, $state, _$log_, _$location_) {
        $scope = $rootScope.$new();
        $log = _$log_;
        $location = _$location_;
    }));

    it('should init application...', function() {
    	expect($scope).toBeTruthy();
    });

    it('should configure default route...', function() {
        $scope.$emit('$locationChangeSuccess');
        expect($location.path()).toBe('/route');
    });

});   