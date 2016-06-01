define('ember-cp-validations/utils/utils', ['exports'], function (exports) {
  'use strict';

  exports.hasEmberData = hasEmberData;

  function hasEmberData() {
    return typeof self.DS !== 'undefined';
  }
});