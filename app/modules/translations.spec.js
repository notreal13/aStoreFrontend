'use strict';

describe('gettext', function() {
  var gettext, catalog;

  beforeEach(module('aStoreFrontend'));

  beforeEach(inject(function(_gettext_, _gettextCatalog_) {
    gettext = _gettext_;
    catalog = _gettextCatalog_;
  }));


  it('catalog to be defined...', function() {
    expect(catalog).toBeDefined();
  });

  it('gettext function is a noop', function() {
    expect(gettext(3)).toBe(3);
  });

  it('gettext function is a noop (string)', function() {
    expect(gettext('test')).toBe('test');
  });
});