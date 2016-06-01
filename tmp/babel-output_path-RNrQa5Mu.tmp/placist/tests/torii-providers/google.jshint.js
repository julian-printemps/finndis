define('finndis/tests/torii-providers/google.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - torii-providers/google.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'torii-providers/google.js should pass jshint.');
  });
});