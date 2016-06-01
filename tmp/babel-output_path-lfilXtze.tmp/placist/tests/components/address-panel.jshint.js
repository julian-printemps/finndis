define('finndis/tests/components/address-panel.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/address-panel.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/address-panel.js should pass jshint.\ncomponents/address-panel.js: line 24, col 28, \'google\' is not defined.\ncomponents/address-panel.js: line 26, col 26, \'google\' is not defined.\n\n2 errors');
  });
});