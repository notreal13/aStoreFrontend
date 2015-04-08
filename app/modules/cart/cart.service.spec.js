'use strict';

describe('Service: cartService', function() {

    beforeEach(module('aStoreFrontend', function($provide) {
        $provide.value('$log', console);
    }));

    var service, $log, $window, ticket1, ticket2, SESSION_STORAGE;

    beforeEach(inject(function(_$log_, _$window_, _cartService_, _SESSION_STORAGE_) {

        $log = _$log_;
        $window = _$window_;
        service = _cartService_;
        SESSION_STORAGE = _SESSION_STORAGE_;
        
        ticket1 = {
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

        ticket2 = {
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
    }));

    afterEach(function() {
        $window.sessionStorage.removeItem(SESSION_STORAGE.cart);
    });

    it('should have service be defined...', function() {
        expect(service).toBeDefined();
    });

    it('should add listener...', function() {
        var count = 0;
        var fn = function() {
            count++;
        };
        service.addListener(fn);
        service.fireChanges();
        expect(count).toBe(1);
    });

    it('should call listeners...', function() {
        var count = 0;
        var lis1 = function() {
            count++;
        };
        var lis2 = function() {
            count++;
        };
        service.addListener(lis1);
        service.addListener(lis2);
        service.fireChanges();
        expect(count).toEqual = 2;
    });

    it('should add ticket to cart...', function() {
        expect(service.getSize()).toEqual(0);
        service.add(ticket1);
        var ticket = service.getTickets()[0];
         expect(ticket.days.length).toBe(31);
        expect(ticket1.number).toEqual(0);
        expect(service.getSize()).toEqual(1);
    });

    it('should remove ticket...', function() {
        service.add(ticket1);
        service.add(ticket2);
        service.remove(ticket1);
        expect(service.getTickets()[0].id).toEqual(2);
    });

    it('should remove all tickets...', function() {
        service.add(ticket1);
        service.add(ticket2);
        service.removeAll();
        expect(service.getSize()).toEqual(0);
    });

    it('should return size (cart)...', function() {
        service.add(ticket1);
        service.add(ticket2);
        expect(service.getSize()).toEqual(2);
    });

    it('should return tickets...', function() {
        service.add(ticket1);
        service.add(ticket2);
        var tickets = service.getTickets();
        expect(angular.equals(tickets[0], ticket1)).toBeTruthy();
        expect(angular.equals(tickets[1], ticket2)).toBeTruthy();
    });

    it('should get total...', function() {
        service.add(ticket1);
        service.add(ticket2);
        var total = ticket1.price + ticket2.price;
        expect(service.getTotal()).toEqual(total.toFixed(2));
    });

    it('should return ordered ticket collection...', function() {
        service.add(ticket1);
        service.add(ticket2);
        var orderedTicketList = service.getOrderedTicketList();
        expect(orderedTicketList.length).toEqual(2);
        var orderedTicket = orderedTicketList[0];
        expect(orderedTicket.ticket.id).toEqual(1);
        expect(orderedTicket.ticket.name).toEqual('ticket1');
        expect(orderedTicket.ticket.price).toEqual(10);
        expect(orderedTicket.ticket.category.id).toEqual(1);
        expect(orderedTicket.ticket.category.name).toEqual('cat1');
        expect(orderedTicket.firstName).toEqual('firstName');
        expect(orderedTicket.lastName).toEqual('lastName');
        expect(orderedTicket.middleName).toEqual('middleName');
        expect(orderedTicket.licensePlate).toEqual('license1');
        // expect(orderedTicket.dobString).toEqual('1999.1.1');
        expect(orderedTicket.supportingDocument.id).toEqual(1);
    });
});