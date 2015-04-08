'use strict';

describe('Service: adminService', function() {

    beforeEach(module('aStoreFrontend', function($provide) {
        $provide.value('$log', console);
    }));

    var service, $rootScope, $log;

    beforeEach(inject(function(_$rootScope_, _$log_, _adminService_) {
        $rootScope = _$rootScope_;
        $log = _$log_;
        service = _adminService_;
    }));

    it('should have service be defined...', function() {
        expect(service).toBeDefined();
    });

    it('should init service...', function() {
        var msg = service.getMessage();
        var mod = service.module;
        expect(msg.text).toBe('');
        expect(msg.advanced).toBe('');
        expect(mod.name).toBe('test');
    });

    it('should clean message and module...', function() {
        var someMsg = { text: 'qqq', advanced: 'www'};
        var someMod = { name: 'eee'};

        service.setMessage(someMsg);
        service.module = someMod;
        
        var msg = service.getMessage();
        var mod = service.module;

        expect(msg.text.length > 0).toBeTruthy();
        expect(msg.advanced.length > 0).toBeTruthy();
        expect(mod.name.length > 0).toBeTruthy();
        
        service.clean();
        msg = service.getMessage();

        expect(msg.text).toBe('');
        expect(msg.advanced).toBe('');
    });

});