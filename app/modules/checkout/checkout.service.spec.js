'use strict';

describe('Service: checkoutService', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var service, $httpBackend, $log, url, purchase;
  var ORDER_ID = 11;

  beforeEach(inject(function(_$httpBackend_, _$log_, REST, _checkoutService_) {
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    url = REST.fullUrl + '/purchase';
    service = _checkoutService_;


    var ticket1 = {
      id: 1,
      name: 'ticket1',
      price: 10,
      firstName: 'firstName',
      lastName: 'lastName',
      middleName: 'middleName',
      licensePlate: 'license1',
      category: {
        id: 1,
        name: 'cat1'
      },
      supportingDocument: {
        id: 1
      }

    };

    var ticket2 = {
      id: 2,
      name: 'ticket2',
      price: 20,
      firstName: 'firstName',
      lastName: 'lastName',
      middleName: 'middleName',
      licensePlate: 'license2',
      category: {
        id: 2,
        name: 'cat2'
      },
      supportingDocument: {
        id: 2
      }
    };

    var orderedTicketList = [];
    orderedTicketList.routeId = 2;
    orderedTicketList.tickets = [];
    orderedTicketList.tickets.push(ticket1);
    orderedTicketList.tickets.push(ticket2);
    // _cart_.add(ticket1);
    // _cart_.add(ticket2);
    // var orderedTicketList = _cart_.getOrderedTicketList();
    // expect(orderedTicketList.length).toEqual(2);

    // purchase.orderedTicketList = orderedTicketList;
    purchase = {
      firstName: 'firstNameMember',
      lastName: 'lastNameMember',
      email: 'email@email.com',
      phone: '111-222-333',
      route: {
        id: 2
      }
    };


    $httpBackend.when('POST', url,
      function(postData) {
        var jsonData = JSON.parse(postData);
        expect(jsonData.firstName).toBe('firstNameMember');
        expect(jsonData.lastName).toBe('lastNameMember');
        expect(jsonData.email).toBe('email@email.com');
        expect(jsonData.phone).toBe('111-222-333');
        // expect(jsonData.route.id).toBe(2);
        // expect(jsonData.orderedTicketList.length).toBe(2);
        // var ticket1 = jsonData.orderedTicketList[0];
        // expect(ticket1.ticket.id).toEqual(1);
        // expect(ticket1.ticket.name).toEqual('ticket1');
        // expect(ticket1.ticket.price).toEqual(10);
        // expect(ticket1.ticket.category.id).toEqual(1);
        // expect(ticket1.ticket.category.name).toEqual('cat1');
        // expect(ticket1.firstName).toEqual('firstName');
        // expect(ticket1.lastName).toEqual('lastName');
        // expect(ticket1.middleName).toEqual('middleName');
        // expect(ticket1.dobString).toEqual('1999.1.1');
        // expect(ticket1.supportingDocument.id).toEqual(1);
        return true;
      }
    ).respond(200, {
      orderId: ORDER_ID
    });
  }));

  it('should have service be defined...', function() {
    expect(service).toBeDefined();
  });

  it('should submit purchase...', function() {
    service.submit(purchase).then(function(data) {
      expect(data).toBeTruthy();
      expect(data.orderId).toEqual(ORDER_ID);
    });
    $httpBackend.expectPOST(url);
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});