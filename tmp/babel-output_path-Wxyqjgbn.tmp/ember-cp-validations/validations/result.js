define('ember-cp-validations/validations/result', ['exports', 'ember', 'ember-cp-validations/validations/result-collection', 'ember-cp-validations/validations/error', 'ember-cp-validations/utils/utils'], function (exports, _ember, _emberCpValidationsValidationsResultCollection, _emberCpValidationsValidationsError, _emberCpValidationsUtilsUtils) {
  /**
   * Copyright 2016, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */

  'use strict';

  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var isNone = _ember['default'].isNone;
  var isArray = _ember['default'].isArray;
  var computed = _ember['default'].computed;
  var canInvoke = _ember['default'].canInvoke;
  var makeArray = _ember['default'].makeArray;
  var setProperties = _ember['default'].setProperties;
  var getProperties = _ember['default'].getProperties;
  var defineProperty = _ember['default'].defineProperty;
  var emberArray = _ember['default'].A;
  var and = computed.and;
  var not = computed.not;

  /**
   * This class is `private` and is only used by {{#crossLink 'ResultCollection'}}{{/crossLink}}
   * @module Validations
   * @class Result
   * @private
   */

  var ValidationsObject = _ember['default'].Object.extend({
    model: null,
    isValid: true,
    isValidating: false,
    message: null,
    attribute: '',

    attrValue: undefined,
    _promise: undefined,

    init: function init() {
      this._super.apply(this, arguments);
      var attribute = get(this, 'attribute');
      // TODO: Not good practice. Stef will make this go away.
      defineProperty(this, 'attrValue', computed.oneWay('model.' + attribute));
    },

    isNotValidating: not('isValidating'),
    isInvalid: not('isValid'),
    isTruelyValid: and('isNotValidating', 'isValid'),

    isAsync: computed('_promise', function () {
      var promise = get(this, '_promise');
      return !isNone(promise) && canInvoke(promise, 'then');
    }),

    isDirty: computed('attrValue', function () {
      var model = get(this, 'model');
      var attribute = get(this, 'attribute');
      var attrValue = get(this, 'attrValue');

      // Check default model values
      if ((0, _emberCpValidationsUtilsUtils.hasEmberData)() && model instanceof self.DS.Model && canInvoke(model, 'eachAttribute')) {
        var attrMeta = model.get('constructor.attributes').get(attribute);
        if (attrMeta) {
          var defaultValue = attrMeta.options.defaultValue;
          if (!isNone(defaultValue)) {
            return defaultValue !== attrValue;
          }
        }
      }
      return !isNone(attrValue);
    }),

    messages: computed('message', function () {
      return makeArray(get(this, 'message'));
    }),

    error: computed('message', 'isInvalid', 'attribute', function () {
      if (get(this, 'isInvalid')) {
        return _emberCpValidationsValidationsError['default'].create({
          message: get(this, 'message'),
          attribute: get(this, 'attribute')
        });
      }

      return null;
    }),

    errors: computed('error', function () {
      return makeArray(get(this, 'error'));
    })
  });

  exports['default'] = _ember['default'].Object.extend({
    /**
     * @property model
     * @type {Object}
     */
    model: null,

    /**
     * @property attribute
     * @type {String}
     */
    attribute: '',

    /**
     * @property _promise
     * @async
     * @private
     * @type {Promise}
     */
    _promise: undefined,

    /**
     * The validator that returned this result
     * @property _validator
     * @private
     * @type {Validator}
     */
    _validator: null,

    /**
     * @property isValid
     * @readOnly
     * @type {Ember.ComputedProperty}
     */
    isValid: computed.oneWay('_validations.isValid'),

    /**
     * @property isInvalid
     * @readOnly
     * @type {Ember.ComputedProperty}
     */
    isInvalid: computed.oneWay('_validations.isInvalid'),

    /**
     * @property isValidating
     * @readOnly
     * @type {Ember.ComputedProperty}
     */
    isValidating: computed.oneWay('_validations.isValidating'),

    /**
     * @property isTruelyValid
     * @readOnly
     * @type {Ember.ComputedProperty}
     */
    isTruelyValid: computed.oneWay('_validations.isTruelyValid'),

    /**
     * @property isAsync
     * @readOnly
     * @type {Ember.ComputedProperty}
     */
    isAsync: computed.oneWay('_validations.isAsync'),

    /**
     * @property isDirty
     * @readOnly
     * @type {Ember.ComputedProperty}
     */
    isDirty: computed.oneWay('_validations.isDirty'),

    /**
     * @property message
     * @readOnly
     * @type {Ember.ComputedProperty}
     */
    message: computed.oneWay('_validations.message'),

    /**
     * @property messages
     * @readOnly
     * @type {Ember.ComputedProperty}
     */
    messages: computed.oneWay('_validations.messages'),

    /**
     * @property error
     * @readOnly
     * @type {Ember.ComputedProperty}
     */
    error: computed.oneWay('_validations.error'),

    /**
     * @property errors
     * @readOnly
     * @type {Ember.ComputedProperty}
     */
    errors: computed.oneWay('_validations.errors'),

    /**
     * This hold all the logic for the above CPs. We do this so we can easily switch this object out with a different validations object
     * @property _validations
     * @private
     * @type {Result}
     */
    _validations: computed('model', 'attribute', '_promise', function () {
      return ValidationsObject.create(getProperties(this, ['model', 'attribute', '_promise']));
    }),

    init: function init() {
      this._super.apply(this, arguments);

      if (get(this, 'isAsync')) {
        this._handlePromise();
      }
    },

    /**
     * Update the current validation result object with the given result
     * - If result is undefined or null, set isValid to false
     * - If result is a validations object from a different model/object, set the _validations object to the one given (belongs-to)
     * - If result is a collection of validation result objects, create a Validation Result Collection and set that to the _validations object (has-many)
     * - If result is a string, set the message to the given string and set isValid to false
     * - If result is a boolean, set isValid to result
     * - If result is a pojo, update _validations object with the information given
     *
     * @method update
     * @private
     * @param result
     */
    update: function update(result) {
      var validations = get(this, '_validations');

      if (isNone(result)) {
        this.update(false);
        return;
      }

      if (get(result, 'isValidations')) {
        set(this, '_validations', result);
      } else if (isArray(result) && emberArray(result).isEvery('isValidations', true)) {
        var validationResultsCollection = _emberCpValidationsValidationsResultCollection['default'].create({
          attribute: get(this, 'attribute'),
          content: result
        });
        set(this, '_validations', validationResultsCollection);
      } else if (typeof result === 'string') {
        setProperties(validations, {
          message: result,
          isValid: false
        });
      } else if (typeof result === 'boolean') {
        set(validations, 'isValid', result);
      } else if (typeof result === 'object') {
        setProperties(validations, result);
      }
    },

    /**
     * Promise handler
     * @method  _handlePromise
     * @private
     */
    _handlePromise: function _handlePromise() {
      var _this = this;

      var validations = get(this, '_validations');
      set(validations, 'isValidating', true);
      get(this, '_promise').then(function (result) {
        return _this.update(result);
      }, function (result) {
        return _this.update(result);
      })['catch'](function (reason) {
        // TODO: send into error state
        throw reason;
      })['finally'](function () {
        set(validations, 'isValidating', false);
      });
    }
  });
});