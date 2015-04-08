'use strict';

describe('Controller: CategoryController', function() {
  var mockCategoryService;

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);

    mockCategoryService = {
        query: function() {}
    };
    $provide.value('categoryService', mockCategoryService);
  }));

  var ctrl, $scope, $log;

  beforeEach(inject(function($rootScope, $controller, _$log_) {
    $log = _$log_;
    $scope = $rootScope.$new();

    spyOn(mockCategoryService, 'query').and.returnValue({});

    ctrl = $controller('CategoryController', {
      '$scope': $scope
    });

  }));

  it('should have controller be defined...', function() {
    expect(ctrl).toBeDefined();
  });

  it('should init controller...', function() {
    expect(ctrl.allCategories).toBeDefined();
    expect(mockCategoryService.query).toHaveBeenCalled();
  });

});