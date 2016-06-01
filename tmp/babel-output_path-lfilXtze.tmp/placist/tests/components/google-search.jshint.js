define('finndis/tests/components/google-search.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/google-search.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/google-search.js should pass jshint.\ncomponents/google-search.js: line 90, col 21, \'google\' is not defined.\ncomponents/google-search.js: line 93, col 28, \'google\' is not defined.\ncomponents/google-search.js: line 106, col 29, \'google\' is not defined.\ncomponents/google-search.js: line 119, col 28, \'google\' is not defined.\ncomponents/google-search.js: line 129, col 30, \'google\' is not defined.\ncomponents/google-search.js: line 134, col 13, \'google\' is not defined.\ncomponents/google-search.js: line 137, col 32, \'google\' is not defined.\n\n7 errors');
  });
});