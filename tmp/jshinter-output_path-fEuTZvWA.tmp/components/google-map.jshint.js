QUnit.module('JSHint - components/google-map.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/google-map.js should pass jshint.\ncomponents/google-map.js: line 16, col 9, \'marker\' is defined but never used.\ncomponents/google-map.js: line 31, col 9, \'marker\' is defined but never used.\ncomponents/google-map.js: line 12, col 15, \'google\' is not defined.\ncomponents/google-map.js: line 16, col 22, \'google\' is not defined.\ncomponents/google-map.js: line 27, col 15, \'google\' is not defined.\ncomponents/google-map.js: line 31, col 22, \'google\' is not defined.\n\n6 errors');
});
