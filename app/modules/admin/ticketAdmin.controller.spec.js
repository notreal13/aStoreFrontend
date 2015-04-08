'use strict';

describe('Controller: TicketAdminController', function() {

    beforeEach(module('aStoreFrontend', function($provide) {
        $provide.value('$log', console);
    }));

    var ctrl, $scope, $log, $state, $rootScope, $httpBackend, $q, mockAdminService, mockCategoryService, queryDeferred, mockCategoriesResponse;

    beforeEach(inject(function(_$rootScope_, $controller, _$log_, _$state_, _$httpBackend_, _$q_) {
        $rootScope = _$rootScope_;
        $log = _$log_;
        $state = _$state_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;

        $httpBackend.whenGET('modules/route/route.html').respond();
        $httpBackend.whenGET('modules/admin/admin.html').respond();
        $httpBackend.whenGET('modules/admin/infoAdmin.html').respond();
        $httpBackend.whenGET('http://localhost:8080/rest/ticket').respond([]);

        mockCategoryService = {
            query: function() {
                queryDeferred = $q.defer();
                return {
                    $promise: queryDeferred.promise
                };
            }
        };
        spyOn(mockCategoryService, 'query').and.callThrough();

        mockAdminService = {
            clean: function() {},
            getMessage: function() {},
            module: {
                name: 'test'
            }
        };
        var msg = {};
        msg.text = '';
        msg.adv = '';
        spyOn(mockAdminService, 'getMessage').and.returnValue(msg);

        mockCategoriesResponse = [{
            'id': 1,
            'name': 'cat1'
        }, {
            'id': 2,
            'name': 'cat2'
        }];

        $scope = $rootScope.$new();
        ctrl = $controller('TicketAdminController', {
            '$scope': $scope,
            'categoryService': mockCategoryService,
            'adminService': mockAdminService
        });
    }));

    it('should have controller be defined...', function() {
        queryDeferred.resolve(mockCategoriesResponse);
        $rootScope.$apply();

        expect(ctrl).toBeDefined();
    });

    it('should init ctrl...', function() {
        expect(ctrl.msg.text).toBe('');
        expect(ctrl.msg.adv).toBe('');
        expect(mockAdminService.module.name).toBe(ctrl.constructor.name);
    });

    it('should query the caregoryService', function() {
        expect(mockCategoryService.query).toHaveBeenCalled();
    });

    it('should set the response from the categoryService to ctrl.categoryHash', function() {
        var keysLength = Object.keys(ctrl.categoryHash).length;
        expect(keysLength >= mockCategoriesResponse.length).toBeTruthy();
    });

    it('should have rolesAllowed in data', function() {
        $rootScope.$digest();
        $state.go('admin.ticketAdmin').then(function() {
            expect($state.current.data).toBeTruthy();
            expect($state.current.data.rolesAllowed).toBeTruthy();
            expect($state.current.data.rolesAllowed.length > 0).toBeTruthy();
        });
    });

});