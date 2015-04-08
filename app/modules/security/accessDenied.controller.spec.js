'use strict';

describe('Controller: AccessDeniedController', function() {

    beforeEach(module('aStoreFrontend', function($provide) {
        $provide.value('$log', console);
    }));

    var ctrl, $scope, $log, $state, $rootScope, $httpBackend, $q, mockSessionService;

    beforeEach(inject(function(_$rootScope_, $controller, _$log_, _$state_, _$httpBackend_, _$q_) {
        $rootScope = _$rootScope_;
        $log = _$log_;
        $state = _$state_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;

        $httpBackend.whenGET('modules/route/route.html').respond();
        $httpBackend.whenGET('modules/admin/admin.html').respond();
        $httpBackend.whenGET('modules/admin/infoAdmin.html').respond();
        $httpBackend.whenGET('http://localhost:8080/aStore/rest/ticket').respond([]);

        mockSessionService = {
            goBack: function() {},
            getToStateUrl: function () { return 'testUrl'; }
        };
        spyOn(mockSessionService, 'goBack');
        spyOn(mockSessionService, 'getToStateUrl');

        $scope = $rootScope.$new();
        ctrl = $controller('AccessDeniedController', {
            '$scope': $scope,
            'sessionService': mockSessionService
        });
    }));

    it('should have controller be defined...', function() {
        expect(ctrl).toBeDefined();
    });

    it('should goBack...', function() {
        ctrl.goBack();
        expect(mockSessionService.goBack);
    });

    it('should getToStateUrl', function() {
        expect(mockSessionService.getToStateUrl).toHaveBeenCalled();
    });

});