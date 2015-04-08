'use strict';

describe('Controller: SignupController', function() {
    var mockSessionService, mockUserService, mockAuthService;

    beforeEach(module('aStoreFrontend', function($provide) {
        $provide.value('$log', console);
        
        mockSessionService =  jasmine.createSpyObj('sessionService',['goBack']);
        $provide.value('sessionService', mockSessionService);

        mockUserService = {
            getInfo: function() {}
        };
        $provide.value('userService', mockUserService);

        mockAuthService = {
            isAuthenticated: function() {}
        };
        $provide.value('authService', mockAuthService);

    }));

    var $scope, ctrl, $log, $interval;

    beforeEach(inject(function($rootScope, $controller, _$log_, _$interval_) {
        $log = _$log_;
        $interval = _$interval_;

        spyOn(mockAuthService, 'isAuthenticated').and.returnValue(true);
        spyOn(mockUserService,'getInfo').and.returnValue(
            {
                name: 'name'
            });

        $scope = $rootScope.$new();
        ctrl = $controller('SignupController', {
            '$scope': $scope
        });
    })); 

    it('should have controller be defined...', function() {
        expect(ctrl).toBeDefined();
    });

    
     it('should invoke gotoBack...', function() {
        ctrl.cancel();
        expect(mockSessionService.goBack).toHaveBeenCalled();
    });

    it('should invoke gotoBack after timeout...', function() {
        ctrl.countdown();
        $interval.flush(5000);
        expect(mockSessionService.goBack).toHaveBeenCalled();
    });
 
    // it('should initForm with a valid user...', function() {
    //     expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
    //     expect(mockUserService.getInfo).toHaveBeenCalled();
    //     expect(ctrl.user).toBeDefined();
    //     expect(ctrl.user.name).toBe('name');
    // });

    // it('should initForm with an anonymous...', function() {
    //     ctrl.user = {};
    //     mockAuthService.isAuthenticated.and.returnValue(false);
    //     ctrl.initForm();
    //     expect(ctrl.user).toBeDefined();
    //     expect(ctrl.user.name).toBe(undefined);
    // });

});