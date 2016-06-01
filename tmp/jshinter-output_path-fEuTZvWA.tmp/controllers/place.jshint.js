QUnit.module('JSHint - controllers/place.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/place.js should pass jshint.\ncontrollers/place.js: line 38, col 87, \'user\' is defined but never used.\ncontrollers/place.js: line 68, col 21, \'model\' is defined but never used.\ncontrollers/place.js: line 80, col 14, Expected \'{\' and instead saw \'return\'.\ncontrollers/place.js: line 84, col 28, \'google\' is not defined.\ncontrollers/place.js: line 87, col 26, \'google\' is not defined.\n\n5 errors');
});
