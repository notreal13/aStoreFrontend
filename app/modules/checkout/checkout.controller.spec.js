'use strict';

describe('Controller: CheckoutController', function() {
    var mockSessionService, mockCartService, mockCheckoutService, mockUserService, queryDeferred;

    beforeEach(module('aStoreFrontend', function($provide) {
        $provide.value('$log', console);

        // mockSessionService = jasmine.createSpyObj('sessionService', ['goHome', 'goBack', 'isAuthenticated']);
        mockSessionService = {
            goHome: function() {},
            goBack: function() {},
            isAuthenticated: function() {}
        };
        $provide.value('sessionService', mockSessionService);

        mockCartService = {
            getTotal: function() {
                return (0).toFixed(2);
            }
        };
        $provide.value('cartService', mockCartService);

        mockCheckoutService = {
            submit: function() {}
        };
        $provide.value('checkoutService', mockCheckoutService);

        mockUserService = {
            get: function() {
                queryDeferred = $q.defer();
                return {
                    $promise: queryDeferred.promise
                };
            }
        };
        $provide.value('userService', mockUserService);
    }));

    var ctrl, $scope, $rootScope, $controller, $log, $q, $httpBackend, mockUser;

    beforeEach(inject(function(_$rootScope_, _$controller_, _$log_, _$q_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $log = _$log_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;

        mockUser = {};
        mockUser.username = 'u';
        mockUser.firstName = 'fn';
        mockUser.lastName = 'ln';
        mockUser.phone = 'p';

        $httpBackend.whenGET('modules/route/route.html').respond();

        $scope = $rootScope.$new();
        ctrl = $controller('CheckoutController', {
            '$scope': $scope
        });
        ctrl.purchase = undefined;
    }));

    it('should have controller be defined...', function() {
        expect(ctrl).toBeDefined();
    });

    it('should init ctrl...', function() {
        var total = 0;
        expect(ctrl.subtotal).toEqual(total.toFixed(2));
        expect(ctrl.surcharge).toEqual(0);
        expect(ctrl.total).toEqual(0);
    });

    it('should init ctrl with authenticated user...', function() {

        spyOn(mockSessionService, 'isAuthenticated').and.returnValue(true);
        spyOn(mockUserService, 'get').and.callThrough();

        ctrl.initForm();

        $scope = $rootScope.$new();
        ctrl = $controller('CheckoutController', {
            '$scope': $scope
        });
        expect(mockSessionService.isAuthenticated).toHaveBeenCalled();
        expect(mockUserService.get).toHaveBeenCalled();
    });


    it('should init purchase anonymous...', function() {
        spyOn(mockSessionService, 'isAuthenticated').and.returnValue(false);
        ctrl.initForm();
        expect(mockSessionService.isAuthenticated).toHaveBeenCalled();
        expect(ctrl.purchase).toBeUndefined();
    });

    it('should init purchase valid user...', function() {
        spyOn(mockSessionService, 'isAuthenticated').and.returnValue(true);
        spyOn(mockUserService, 'get').and.callThrough();
        
        ctrl.initForm();
        queryDeferred.resolve(mockUser);
        $rootScope.$apply();    
        expect(mockSessionService.isAuthenticated).toHaveBeenCalled();
        expect(ctrl.purchase).toBeDefined();
        expect(mockUserService.get).toHaveBeenCalled();
    });

    it('should cancel purchase...', function() {
        spyOn(mockSessionService, 'goBack');
        ctrl.cancelPurchase();
        expect(mockSessionService.goBack).toHaveBeenCalled();
    });

    it('should submit purchase...', function() {
        spyOn(mockCheckoutService, 'submit').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve('123');
            return deferred.promise;
        });
        ctrl.submitPurchase();
        expect(mockCheckoutService.submit.calls.count()).toEqual(1);
    });

    it('should start shopping again', function() {
        spyOn(mockSessionService, 'goHome');
        ctrl.startShoppingAgain();
        expect(mockSessionService.goHome).toHaveBeenCalled();
    });

});