define('finndis/tests/authenticators/torii1.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authenticators/torii1.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/torii1.js should pass jshint.');
  });
});