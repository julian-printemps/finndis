define('finndis/tests/components/signup-form.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/signup-form.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/signup-form.js should pass jshint.\ncomponents/signup-form.js: line 21, col 11, \'self\' is defined but never used.\ncomponents/signup-form.js: line 3, col 9, \'service\' is defined but never used.\n\n2 errors');
  });
});