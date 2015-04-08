'use strict';

describe('Constant: constants', function() {

  beforeEach(module('aStoreFrontend', function($provide) {
    $provide.value('$log', console);
  }));

  var $log, REST, AUTH_EVENTS, USER_ROLES, SESSION_STORAGE;

  beforeEach(inject(function(_$log_, _REST_, _AUTH_EVENTS_, _USER_ROLES_, _SESSION_STORAGE_) {

    $log = _$log_;
    REST = _REST_;
    AUTH_EVENTS = _AUTH_EVENTS_;
    USER_ROLES = _USER_ROLES_;
    SESSION_STORAGE = _SESSION_STORAGE_;
  }));

  it('should exist REST...', function() {
    expect(REST).toBeDefined();
    expect(REST.baseUrl).toBeDefined();
    expect(REST.fullUrl).toBeDefined();
    expect(REST.port).toBeDefined();
    expect(REST.timeout).toBeDefined();
  });

  it('should exist AUTH_EVENTS...', function() {
    expect(AUTH_EVENTS).toBeDefined();
  });

  it('should exist USER_ROLES...', function() {
    expect(USER_ROLES).toBeDefined();
  });

  it('should exist SESSION_STORAGE...', function() {
    expect(SESSION_STORAGE).toBeDefined();
  });
});