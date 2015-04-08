'use strict';

describe('Service: supportingDocumentService', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var service, $httpBackend, $log, url;

  beforeEach(inject(function(_$httpBackend_, _$log_, _supportingDocumentService_, REST) {
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    url = REST.fullUrl + '/document';
    service = _supportingDocumentService_;

    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixture';
    var validSupportingDocuments = getJSONFixture('supportingDocuments.json');

    $httpBackend.whenGET(url).respond(function() {
      return [200, validSupportingDocuments];
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have service be defined...', function() {
    expect(service).toBeDefined();
  });  

  it('should get allSupportingDocuments...', function() {
    var docs = service.query();
    $httpBackend.expectGET(url);
    $httpBackend.flush();

    expect(docs.length).toEqual(19);
    expect(docs[0].docType).toBe(0);
    expect(docs[0].name).toBe('Паспорт гражданина Российской федерации');
  });

});