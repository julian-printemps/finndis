define('finndis/tests/routes/place.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/place.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/place.js should pass jshint.\nroutes/place.js: line 8, col 52, \'transition\' is defined but never used.\n\n1 error');
  });
});