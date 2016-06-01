QUnit.module('JSHint - components/google-map.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/google-map.js should pass jshint.\ncomponents/google-map.js: line 15, col 9, \'marker\' is defined but never used.\ncomponents/google-map.js: line 30, col 9, \'marker\' is defined but never used.\ncomponents/google-map.js: line 11, col 15, \'google\' is not defined.\ncomponents/google-map.js: line 15, col 22, \'google\' is not defined.\ncomponents/google-map.js: line 26, col 15, \'google\' is not defined.\ncomponents/google-map.js: line 30, col 22, \'google\' is not defined.\n\n6 errors');
});
