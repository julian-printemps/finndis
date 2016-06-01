define('finndis/tests/controllers/place.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/place.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/place.js should pass jshint.\ncontrollers/place.js: line 59, col 21, \'model\' is defined but never used.\ncontrollers/place.js: line 74, col 28, \'google\' is not defined.\ncontrollers/place.js: line 78, col 26, \'google\' is not defined.\n\n3 errors');
  });
});