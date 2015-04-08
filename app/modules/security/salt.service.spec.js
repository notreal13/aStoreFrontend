'use strict';

describe('Service: saltService', function() {

    beforeEach(module('aStoreFrontend', function($provide) {
        $provide.value('$log', console);
    }));

    var service, $httpBackend, $log, url, $timeout, validSalt, username;

    beforeEach(inject(function(_$httpBackend_, _$log_, _$timeout_, _saltService_, REST) {
        $httpBackend = _$httpBackend_;
        $log = _$log_;
        $timeout = _$timeout_;
        service = _saltService_;

        username = 'a@a';
        url = REST.fullUrl + '/user/salt';
        url = url + '?username=' + username;

        jasmine.getJSONFixtures().fixturesPath='base/test/fixture';
        validSalt = getJSONFixture('salt.json');

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have service be defined...', function() {
        expect(service).toBeDefined();
    });

    it('should get salt...', function() {
        var salt = service.getSalt(username);
        
        $httpBackend.whenGET(url).respond(validSalt);
        $httpBackend.expectGET(url);
        $httpBackend.flush();
        salt.then( function(data) {
            expect(data).toBe(validSalt.salt);
        });
    });

    it('should throw error due timeout...', function() {
        $timeout(angular.noop);

        expect(function () {
            $timeout.verifyNoPendingTasks();
        }).toThrow();
    });

    it('should do nothing when all tasks have been flushed...', function() {
        $timeout(angular.noop);
        var salt = service.getSalt(username);
        $httpBackend.whenGET(url).respond(validSalt);
        $httpBackend.flush();
        salt.then(
            function() {});
        $timeout.flush();
        expect(function() {
            $timeout.verifyNoPendingTasks();
        }).not.toThrow();
    });

});