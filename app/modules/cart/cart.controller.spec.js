'use strict';

describe('Controller: CartController', function() {
  var mockCartService, mockSupportingDocumentService, mockSessionService;

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);

    mockCartService = {
      getTickets: function() {
        return [{}, {}];
      },
      getTotal: function () {
        return 111;
      },
      getSize: function() {},
      remove: function() {},
      removeAll: function() {}
    };
    $provide.value('cartService', mockCartService);

    mockSupportingDocumentService = {
        query: function() { return 'some docs'; }
    };
    $provide.value('supportingDocumentService', mockSupportingDocumentService);

    mockSessionService = jasmine.createSpyObj('sessionService', ['goHome']);
    $provide.value('sessionService', mockSessionService);

  }));

  var ctrl, $scope, $log, $filter, $state;

  beforeEach(inject(function($rootScope, $controller, _$log_, $resource, _$filter_, _$state_) {
    $log = _$log_;
    $filter = _$filter_;
    $state = _$state_;
    $scope = $rootScope.$new();
    ctrl = $controller('CartController', {
      '$scope': $scope
    });

  }));

  it('should have controller be defined...', function() {
    expect(ctrl).toBeDefined();
  });

  it('should init controller...', function() {
    expect(ctrl.allSupportingDocuments).toBeDefined();
    expect(ctrl.tickets.length).toEqual(2);
    expect(ctrl.total).toEqual(111);
  });

  it('should have array of years...', function() {
    expect(ctrl.years.length).toEqual(100);
    var beginYear = (new Date()).getFullYear() - 100;
    var endYear = (new Date()).getFullYear() - 1;
    expect(ctrl.years[0]).toEqual(beginYear);
    expect(ctrl.years[99]).toEqual(endYear);
  });

  it('should have array of months...', function() {
    expect(ctrl.months.length).toEqual(12);
    var janName = $filter('date')(new Date(1, 0, 1), 'MMMM');
    expect(ctrl.months[0].number).toEqual(1);
    expect(ctrl.months[0].name).toEqual(janName);
  });

  it('should updateDob (array of 28 days in february and ticket.dobString = "01/02/2015")...', function() {
    var ticket = {};
    ticket.dob = {};
    ticket.dob.year = 2015;
    ticket.dob.month = {};
    ticket.dob.month.number = 2;
    ctrl.updateDob(ticket);
    expect(ticket.days.length).toEqual(28);
    ticket.dob.day = 1;
    ctrl.updateDob(ticket);
    expect(ticket.dobString).toEqual('2015.2.1');
  });

  it('should update cart after remove ticket and stay in page...', function() {
    expect(ctrl.tickets.length).toEqual(2);
    expect(ctrl.total).toEqual(111);
    spyOn(mockCartService, 'getTickets').and.returnValue([{}]);
    spyOn(mockCartService, 'getTotal').and.returnValue(100);
    spyOn(mockCartService, 'remove').and.callThrough();
    spyOn(mockCartService, 'getSize').and.returnValue(1);    

    var ticket = 'someTicket';
    ctrl.remove(ticket);
    
    expect(mockCartService.remove).toHaveBeenCalledWith(ticket);
    expect(ctrl.tickets.length).toEqual(1);
    expect(ctrl.total).toEqual(100);
    expect(mockCartService.getSize).toHaveBeenCalled();
    expect(mockSessionService.goHome).not.toHaveBeenCalled();
  });

  it('should update cart after remove ticket and go home...', function() {
    expect(ctrl.tickets.length).toEqual(2);
    expect(ctrl.total).toEqual(111);
    spyOn(mockCartService, 'getTickets').and.returnValue([]);
    spyOn(mockCartService, 'getTotal').and.returnValue(0);
    spyOn(mockCartService, 'remove').and.callThrough();
    spyOn(mockCartService, 'getSize').and.returnValue(0);

    var ticket = 'someTicket';
    ctrl.remove(ticket);
    
    expect(mockCartService.remove).toHaveBeenCalledWith(ticket);
    expect(ctrl.tickets.length).toEqual(0);
    expect(ctrl.total).toEqual(0);
    expect(mockCartService.getSize).toHaveBeenCalled();
    expect(mockSessionService.goHome).toHaveBeenCalled();
  });

  it('should update cart after removeAll and go home...', function() {
    expect(ctrl.tickets.length).toEqual(2);
    expect(ctrl.total).toEqual(111);

    spyOn(mockCartService, 'getTickets').and.returnValue([]);
    spyOn(mockCartService, 'getTotal').and.returnValue(0);
    spyOn(mockCartService, 'removeAll').and.callThrough();
    spyOn(mockCartService, 'getSize').and.returnValue(0);

    ctrl.removeAll();

    expect(mockCartService.removeAll).toHaveBeenCalled();
    expect(ctrl.tickets.length).toEqual(0);
    expect(ctrl.total).toEqual(0);
    expect(mockCartService.getSize).toHaveBeenCalled();
    expect(mockSessionService.goHome).toHaveBeenCalled();
  });

});