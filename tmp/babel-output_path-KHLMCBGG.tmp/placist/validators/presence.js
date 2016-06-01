define('finndis/validators/presence', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  var get = _ember['default'].get;
  var isEmpty = _ember['default'].isEmpty;

  /**
   *  If `true` validates that the given value is not empty, if `false`, validates that the given value is empty.
   *
   *  ```javascript
   *  // Examples
   *  validator('presence', true)
   *  validator('presence', false)
   *  validator('presence', {
   *    presence: true,
   *    message: 'should not be empty'
   *  })
   *  ```
   *
   *  @class Presence
   *  @module Validators
   *  @extends Base
   */
  exports['default'] = _emberCpValidationsValidatorsBase['default'].extend({
    /**
     * Normalized options passed in.
     * ```js
     * validator('presence', true)
     * // Becomes
     * validator('presence', {
     *   presence: true
     * })
     * ```
     * @method buildOptions
     * @param  {Object}     options
     * @param  {Object}     defaultOptions
     * @return {Object}
     */
    buildOptions: function buildOptions(options, defaultOptions) {
      if (typeof options === 'boolean') {
        options = {
          presence: options
        };
      }
      return this._super(options, defaultOptions);
    },

    validate: function validate(value, options) {
      if (options.presence === true && !this._isPresent(value)) {
        return this.createErrorMessage('blank', value, options);
      }

      if (options.presence === false && this._isPresent(value)) {
        return this.createErrorMessage('present', value, options);
      }

      return true;
    },

    /**
     * Handle presence of ember proxy based instances
     */
    _isPresent: function _isPresent(value) {
      if (value instanceof _ember['default'].ObjectProxy || value instanceof _ember['default'].ArrayProxy) {
        return this._isPresent(get(value, 'content'));
      }
      return !isEmpty(value);
    }
  });
});
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */