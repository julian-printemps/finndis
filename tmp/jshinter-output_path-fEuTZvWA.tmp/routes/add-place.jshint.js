QUnit.module('JSHint - routes/add-place.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/add-place.js should pass jshint.\nroutes/add-place.js: line 8, col 52, \'transition\' is defined but never used.\n\n1 error');
});
