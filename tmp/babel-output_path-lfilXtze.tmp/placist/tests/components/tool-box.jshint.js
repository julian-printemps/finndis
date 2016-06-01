define('finndis/tests/components/tool-box.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/tool-box.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/tool-box.js should pass jshint.');
  });
});