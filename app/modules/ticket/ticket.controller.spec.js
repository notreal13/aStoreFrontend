'use strict';

describe('Controller: TicketController', function() {
  var mockTicketService, mockTicketByCategoryService, mockCartService;

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);

    mockTicketService = {
        query: function() {}
    };
    $provide.value('ticketService', mockTicketService);

    mockTicketByCategoryService = {
        query: function() {}
    };
    $provide.value('ticketByCategoryService', mockTicketByCategoryService);

    mockCartService = {
        add: function() {}
    };
    $provide.value('cartService', mockCartService);

  }));

  var ctrl, $scope, $log, $state, $stateParams, $rootScope, $httpBackend;

  beforeEach(inject(function(_$rootScope_, $controller, _$log_, _$state_, _$stateParams_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $log = _$log_;
    $state = _$state_;
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;

    $stateParams.categoryId = 1;
    spyOn(mockTicketByCategoryService, 'query').and.returnValue([{}]);

    $scope = $rootScope.$new();
    ctrl = $controller('TicketController', {
      '$scope': $scope
    });

    $httpBackend.whenGET('modules/category/category.html').respond();
    $httpBackend.whenGET('modules/route/route.html').respond();

  }));

  it('should have controller be defined...', function() {
    expect(ctrl).toBeDefined();
  });

  it('should init ctrl...', function() {
    expect(mockTicketByCategoryService.query).toHaveBeenCalled();
    expect(mockTicketByCategoryService.query).toHaveBeenCalledWith({ categoryId: 1});
    expect(ctrl.allTickets).toBeDefined();
  });

  it('should invoke goBack...', function() {
    ctrl.goBack();
    $httpBackend.expectGET('modules/category/category.html');
    $httpBackend.flush();
  });

  it('should add ticket to cart...', function() {
    spyOn(mockCartService, 'add').and.returnValue();
    var ticket = 'someTicket';
    ctrl.addToCart(ticket);
    expect(mockCartService.add).toHaveBeenCalledWith(ticket);
  });

});