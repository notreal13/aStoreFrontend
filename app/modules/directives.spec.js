'use strict';

describe('Dirctives: ', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var $scope, $compile, $log, validElement;

  beforeEach(inject(function(_$rootScope_, _$compile_, _$log_) {
    $compile = _$compile_;
    $log = _$log_;

    $scope = _$rootScope_.$new();

    var validDirective = '<div ng-model="passwordConfirm" match="password">';
    
    validElement = $compile(validDirective)($scope);
  }));

  it('should throw when no ngModel is found...', function() {
    var wrongElement = '<div match="data"></div>';
    function compile() {
      $compile(wrongElement)($scope);
    }
    expect(compile).toThrow();
  });

  it('should return false if not match...', function() {
    $scope.password = '1';
    $scope.passwordConfirm = '2';
    $scope.$digest();
    expect(validElement.hasClass('ng-valid')).toBeFalsy();
  });

  it('shoulds return true if match...', function() {
    $scope.password = '1';
    $scope.passwordConfirm = '1';
    
    $scope.$digest();
    expect(validElement.hasClass('ng-valid')).toBeTruthy();
  });

  it('shoulds return true if model is pristine...', function() {
    expect($scope.password).toBeUndefined();
    $scope.$digest();
    expect(validElement.hasClass('ng-valid')).toBeTruthy();
  });

});