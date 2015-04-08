'use strict';

var httpProvider;

describe('Service: requestInterceptor', function() {

    beforeEach(module('aStoreFrontend', function($provide, $httpProvider) {
        $provide.value('$log', console);
        httpProvider = $httpProvider;
    }));

    var service, $http, $httpBackend, $log;
    var token = 'someToken';

    beforeEach(inject(function(_$log_, _$http_, _$httpBackend_, _requestInterceptor_) {
        $log = _$log_;
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        service = _requestInterceptor_;
    }));

    it('should have service be defined...', function() {
        expect(service).toBeDefined();
    });

    it('should properly set an api token...', function() {
        expect(service.getToken()).toBeNull();
        service.setToken(token);
        expect(service.getToken()).toBe(token);
    });

    it('should hava no api token upom start up...', function() {
        var someToken = service.getToken();
        expect(someToken).toBeNull();
    });

    it('should have the requestInterceptor as an interceptor...', function() {
        expect(httpProvider.interceptors).toContain('requestInterceptor');
    });

    it('should token in the headers after setting...', function() {
        service.setToken(token);
        $httpBackend.expect('GET', 'http://example.com', null, function(headers) {
            return !(
                expect(headers['aStore-auth-token']).toBe(token)
                );

        }).respond(200);
        $http(
            {
                method: 'GET',
                url: 'http://example.com'
            }
        );
        $httpBackend.flush();
    });

    it('should not place a token in the http request headers if no token is set', function() {
        var config = service.request({
            headers: {}
        });
        $httpBackend.expect('GET', 'http://example.com', null, function(headers) {
            return !(
                expect(headers['aStore-auth-token']).toBeUndefined()
                );
        }).respond(200);
        $http(
            {
                method: 'GET',
                url: 'http://example.com'
            }
        );
        $httpBackend.flush();
        expect(config.headers['aStore-auth-token']).toBeUndefined();
    });

    it('should place a token in the http request headers after a token is set', function() {
        service.setToken(token);
        var config = service.request({
            headers: {}
        });
        expect(config.headers['aStore-auth-token']).toBe(token);
    });
});