QUnit.module('JSHint - models/user.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/user.js should pass jshint.\nmodels/user.js: line 1, col 8, \'Ember\' is defined but never used.\n\n1 error');
});
