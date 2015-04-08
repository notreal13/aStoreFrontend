'use strict';

describe('Service: asmCryptoService', function() {

    beforeEach(module('aStoreFrontend', function($provide) {
        $provide.value('$log', console);
    }));

    var service, $rootScope, $log;

    beforeEach(inject(function(_$rootScope_, _$log_, _asmCrypto_) {
        $rootScope = _$rootScope_;
        $log = _$log_;
        service = _asmCrypto_;
    }));

    it('should have service be defined...', function() {
        expect(service).toBeDefined();
    });

});