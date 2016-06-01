QUnit.module('JSHint - controllers/add-place.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/add-place.js should pass jshint.\ncontrollers/add-place.js: line 33, col 19, \'addressstreet\' is defined but never used.\ncontrollers/add-place.js: line 158, col 21, \'model\' is defined but never used.\ncontrollers/add-place.js: line 238, col 11, \'errors\' is defined but never used.\ncontrollers/add-place.js: line 29, col 30, \'google\' is not defined.\ncontrollers/add-place.js: line 31, col 28, \'google\' is not defined.\n\n5 errors');
});
