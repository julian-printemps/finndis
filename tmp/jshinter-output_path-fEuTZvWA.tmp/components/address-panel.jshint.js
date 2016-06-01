QUnit.module('JSHint - components/address-panel.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/address-panel.js should pass jshint.\ncomponents/address-panel.js: line 30, col 14, Expected \'{\' and instead saw \'return\'.\ncomponents/address-panel.js: line 34, col 28, \'google\' is not defined.\ncomponents/address-panel.js: line 36, col 26, \'google\' is not defined.\n\n3 errors');
});
