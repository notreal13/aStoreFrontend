'use strict';

describe('Service: purchaseService', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var service, $httpBackend, $log, url;

  beforeEach(inject(function(_$httpBackend_, _$log_, _purchaseService_, REST) {
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    url = REST.fullUrl + '/purchase';
    service = _purchaseService_;

    $httpBackend.whenPOST(url).respond({});
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have service be defined...', function() {
    expect(service).toBeDefined();
  });

  it('should post data...', function() {
    service.save();
    $httpBackend.expectPOST(url);
    $httpBackend.flush();
  });

});