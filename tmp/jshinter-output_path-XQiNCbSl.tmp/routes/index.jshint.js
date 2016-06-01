QUnit.module('JSHint - routes/index.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 8, col 9, \'host\' is defined but never used.\nroutes/index.js: line 3, col 8, \'request\' is defined but never used.\n\n2 errors');
});
