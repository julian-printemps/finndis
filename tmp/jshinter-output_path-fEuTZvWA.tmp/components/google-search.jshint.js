QUnit.module('JSHint - components/google-search.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/google-search.js should pass jshint.\ncomponents/google-search.js: line 83, col 13, \'keyword\' is already defined.\ncomponents/google-search.js: line 87, col 29, \'keyword\' used out of scope.\ncomponents/google-search.js: line 91, col 11, \'service\' is defined but never used.\ncomponents/google-search.js: line 335, col 37, \'newPlace\' is defined but never used.\ncomponents/google-search.js: line 88, col 21, \'google\' is not defined.\ncomponents/google-search.js: line 92, col 28, \'google\' is not defined.\ncomponents/google-search.js: line 105, col 29, \'google\' is not defined.\ncomponents/google-search.js: line 118, col 28, \'google\' is not defined.\ncomponents/google-search.js: line 128, col 30, \'google\' is not defined.\ncomponents/google-search.js: line 133, col 13, \'google\' is not defined.\ncomponents/google-search.js: line 136, col 32, \'google\' is not defined.\n\n11 errors');
});