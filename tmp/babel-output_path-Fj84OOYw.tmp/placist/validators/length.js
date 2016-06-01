define('finndis/validators/length', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var get = _ember['default'].get;
  var isNone = _ember['default'].isNone;
  var isEmpty = _ember['default'].isEmpty;

  /**
   *  Validates the length of the attributes’ values.
   *
   *   #### Options
   *  - `allowBlank` (**Boolean**): If true, skips validation if the value is empty
   *  - `is` (**Number**): The exact length the value can be
   *  - `min` (**Number**): The minimum length the value can be
   *  - `max` (**Number**): The maximum length the value can be
   *
   *  ```javascript
   *  // Examples
   *  validator('length', {
   *    is: 15
   *  })
   *  validator('length', {
   *      min: 5,
   *      max: 10
   *  })
   *  ```
   *
   *  @class Length
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value, options) {
      if (isEmpty(Object.keys(options))) {
        return true;
      }

      if (options.allowBlank && isEmpty(value)) {
        return true;
      }

      if (isNone(value)) {
        return true;
      }

      if (!isNone(options.is) && options.is !== get(value, 'length')) {
        return this.createErrorMessage('wrongLength', value, options);
      }

      if (!isNone(options.min) && options.min > get(value, 'length')) {
        return this.createErrorMessage('tooShort', value, options);
      }

      if (!isNone(options.max) && options.max < get(value, 'length')) {
        return this.createErrorMessage('tooLong', value, options);
      }

      return true;
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */