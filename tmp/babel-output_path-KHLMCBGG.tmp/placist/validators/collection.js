define('finndis/validators/collection', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var isArray = _ember['default'].isArray;

  /**
   *  If `true` validates that the given value is a valid collection and will add `<ATTRIUTE>.[]` as a dependent key to the CP. If `false`, validates that the given value is singular. Use this validator if you want validation to occur when the content of your collection changes.
   *
   *  ```javascript
   *  // Examples
   *  validator('collection', true)
   *  validator('collection', false)
   *  validator('collection', {
   *    collection: true,
   *    message: 'must be a collection'
   *  })
   *  ```
   *
   *  @class Collection
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    buildOptions: function buildOptions(options, defaultOptions) {
      if (typeof options === 'boolean') {
        options = {
          collection: options
        };
      }
      return this._super(options, defaultOptions);
    },

    validate: function validate(value, options) {
      if (options.collection === true && !isArray(value)) {
        return this.createErrorMessage('collection', value, options);
      }

      if (options.collection === false && isArray(value)) {
        return this.createErrorMessage('singular', value, options);
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */