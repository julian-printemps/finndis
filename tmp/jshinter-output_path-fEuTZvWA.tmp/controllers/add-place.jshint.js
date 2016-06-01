QUnit.module('JSHint - controllers/add-place.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/add-place.js should pass jshint.\ncontrollers/add-place.js: line 38, col 19, \'locality\' is defined but never used.\ncontrollers/add-place.js: line 39, col 19, \'administrative_area_level_1\' is defined but never used.\ncontrollers/add-place.js: line 105, col 11, \'place\' is defined but never used.\ncontrollers/add-place.js: line 112, col 21, \'model\' is defined but never used.\ncontrollers/add-place.js: line 123, col 13, \'longaddress\' is already defined.\ncontrollers/add-place.js: line 192, col 11, \'errors\' is defined but never used.\ncontrollers/add-place.js: line 127, col 37, \'longaddress\' used out of scope.\ncontrollers/add-place.js: line 34, col 30, \'google\' is not defined.\ncontrollers/add-place.js: line 36, col 28, \'google\' is not defined.\n\n9 errors');
});
