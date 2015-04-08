'use strict';

describe('Service: ticketService', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var service, $httpBackend, $log, url;

  beforeEach(inject(function(_$httpBackend_, _$log_, _ticketByCategoryService_, REST) {
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    url = REST.fullUrl + '/ticket/category/1';
    service = _ticketByCategoryService_;

    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixture';
    var validTickets = getJSONFixture('tickets_1.json');

    $httpBackend.whenGET(url).respond(function() {
      return [200, validTickets];
    });

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have service be defined...', function() {
    expect(service).toBeDefined();
  });

  it('should get allTickets in category 1...', function() {
    var tickets = service.query({
      categoryId: 1
    });
    $httpBackend.expectGET(url);
    $httpBackend.flush();
    expect(tickets.length).toBe(4);
  });

});