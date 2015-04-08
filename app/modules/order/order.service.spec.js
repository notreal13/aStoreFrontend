'use strict';

describe('Service: orderService', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var service, $httpBackend, $log, url, validOrders;

  beforeEach(inject(function(_$httpBackend_, _$log_, REST, _orderService_) {
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    url = REST.fullUrl + '/order';
    service = _orderService_;

    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixture';
    validOrders = getJSONFixture('orders.json');
    $httpBackend.whenGET(url).respond(validOrders);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have service be defined...', function() {
    expect(service).toBeDefined();
  });

  it('should findAll...', function() {
    var orders = service.query();
    $httpBackend.expectGET(url);
    $httpBackend.flush();
    expect(orders.length).toBe(1);
    expect(orders[0].email).toBe('oleg@setco.ru');
  });


});