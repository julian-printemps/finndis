QUnit.module('JSHint - components/login-form.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/login-form.js should pass jshint.\ncomponents/login-form.js: line 3, col 9, \'service\' is defined but never used.\n\n1 error');
});
