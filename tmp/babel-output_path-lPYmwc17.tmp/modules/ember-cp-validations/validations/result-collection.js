/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import flatten from '../utils/flatten';
import cycleBreaker from '../utils/cycle-breaker';

var get = Ember.get;
var set = Ember.set;
var RSVP = Ember.RSVP;
var computed = Ember.computed;
var isEmpty = Ember.isEmpty;
var isArray = Ember.isArray;
var isNone = Ember.isNone;
var emberArray = Ember.A;

var A = emberArray();

function callable(method) {
  return function (collection) {
    return A[method].apply(collection, arguments);
  };
}

var uniq = callable('uniq');
var compact = callable('compact');

/**
 * @module Validations
 * @class ResultCollection
 */
export default Ember.Object.extend({
  /**
   * A set of all validator {{#crossLink "Result"}}{{/crossLink}} objects for this specific attribute
   * @property content
   * @type {Ember.Array}
   */
  content: null,

  /**
   * The attribute that this collection belongs to
   * @property attribute
   * @type {String}
   */
  attribute: '',

  init: function init() {
    this._super.apply(this, arguments);
    set(this, 'content', emberArray(get(this, 'content')));
  },

  /**
   * ```javascript
   * // Examples
   * get(user, 'validations.isInvalid')
   * get(user, 'validations.attrs.username.isInvalid')
   * ```
   *
   * @property isInvalid
   * @readOnly
   * @type {Ember.ComputedProperty | Boolean}
   */
  isInvalid: computed.not('isValid'),

  /**
   * ```javascript
   * // Examples
   * get(user, 'validations.isValid')
   * get(user, 'validations.attrs.username.isValid')
   * ```
   *
   * @property isValid
   * @default true
   * @readOnly
   * @type {Ember.ComputedProperty | Boolean}
   */
  isValid: computed('content.@each.isValid', cycleBreaker(function () {
    return get(this, 'content').isEvery('isValid', true);
  }, true)),

  /**
   * This property is toggled only if there is an async validation
   *
   * ```javascript
   * // Examples
   * get(user, 'validations.isValidating')
   * get(user, 'validations.attrs.username.isValidating')
   * ```
   *
   * @property isValidating
   * @default false
   * @readOnly
   * @type {Ember.ComputedProperty | Boolean}
   */
  isValidating: computed('content.@each.isValidating', cycleBreaker(function () {
    return !get(this, 'content').isEvery('isValidating', false);
  }, false)),

  /**
   * Will be true only if isValid is `true` and isValidating is `false`
   *
   * ```javascript
   * // Examples
   * get(user, 'validations.isTruelyValid')
   * get(user, 'validations.attrs.username.isTruelyValid')
   * ```
   *
   * @property isTruelyValid
   * @default true
   * @readOnly
   * @type {Ember.ComputedProperty | Boolean}
   */
  isTruelyValid: computed('content.@each.isTruelyValid', cycleBreaker(function () {
    return get(this, 'content').isEvery('isTruelyValid', true);
  }, true)),

  /**
   * Will be true is the attribute in question is not `null` or `undefined`. If the object being validated is an Ember Data Model and you have a `defaultValue` specified, then it will use that for comparison.
   *
   * ```javascript
   * // Examples
   * // 'username' : DS.attr('string', { defaultValue: 'johndoe' })
   * get(user, 'validations.isDirty')
   * get(user, 'validations.attrs.username.isDirty')
   * ```
   *
   * @property isDirty
   * @default false
   * @readOnly
   * @type {Ember.ComputedProperty | Boolean}
   */
  isDirty: computed('content.@each.isDirty', cycleBreaker(function () {
    return !get(this, 'content').isEvery('isDirty', false);
  }, false)),

  /**
   * Will be `true` only if a validation returns a promise
   *
   * ```javascript
   * // Examples
   * get(user, 'validations.isAsync')
   * get(user, 'validations.attrs.username.isAsync')
   * ```
   *
   * @property isAsync
   * @default false
   * @readOnly
   * @type {Ember.ComputedProperty | Boolean}
   */
  isAsync: computed('content.@each.isAsync', cycleBreaker(function () {
    return !get(this, 'content').isEvery('isAsync', false);
  }, false)),

  /**
   * A collection of all error messages on the object in question
   *
   * ```javascript
   * // Examples
   * get(user, 'validations.messages')
   * get(user, 'validations.attrs.username.messages')
   * ```
   *
   * @property messages
   * @readOnly
   * @type {Ember.ComputedProperty | Array}
   */
  messages: computed('content.@each.messages', cycleBreaker(function () {
    var messages = flatten(get(this, 'content').getEach('messages'));
    return uniq(compact(messages));
  })),

  /**
   * An alias to the first message in the messages collection.
   *
   * ```javascript
   * // Example
   * get(user, 'validations.message')
   * get(user, 'validations.attrs.username.message')
   * ```
   *
   * @property message
   * @readOnly
   * @type {Ember.ComputedProperty | String}
   */
  message: computed('messages.[]', cycleBreaker(function () {
    return get(this, 'messages.0');
  })),

  /**
   * A collection of all {{#crossLink "Error"}}Errors{{/crossLink}} on the object in question. Each error object includes the error message and it's associated attribute name.
   *
   * ```javascript
   * // Example
   * get(user, 'validations.errors')
   * get(user, 'validations.attrs.username.errors')
   * ```
   *
   * @property errors
   * @readOnly
   * @type {Ember.ComputedProperty | Array}
   */
  errors: computed('content.@each.errors', cycleBreaker(function () {
    var errors = flatten(get(this, 'content').getEach('errors'));
    return uniq(compact(errors));
  })),

  /**
   * An alias to the first {{#crossLink "Error"}}{{/crossLink}} in the errors collection.
   *
   * ```javascript
   * // Example
   * get(user, 'validations.error')
   * get(user, 'validations.attrs.username.error')
   * ```
   *
   * @property error
   * @readOnly
   * @type {Ember.ComputedProperty | Error}
   */
  error: computed('errors.[]', cycleBreaker(function () {
    return get(this, 'errors.0');
  })),

  /**
   * All built options of the validators associated with the results in this collection grouped by validator type
   *
   * ```javascript
   * // Given the following validators
   * {
   *   username: [
   *     validator('presence', true),
   *     validator('length', { max: 15 }),
   *     validator('format', { regex: /foo/ }),
   *     validator('format', { regex: /bar/ }),
   *   ]
   * }
   * ```
   *
   * ```js
   * get(user, 'validations.attrs.username.options')
   * ```
   *
   * The above will return the following
   * ```js
   * {
   *   'presence': { presence: true},
   *   'length': { max: 15 },
   *   'regex': [{ regex: /foo/ }, { regex: /bar/ }]
   * }
   * ```
   *
   * @property options
   * @readOnly
   * @type {Ember.ComputedProperty | Object}
   */
  options: computed('content.[]', function () {
    return this._groupValidatorOptions();
  }),

  /**
   * @property _promise
   * @async
   * @private
   * @type {Ember.ComputedProperty | Promise}
   */
  _promise: computed('content.@each._promise', cycleBreaker(function () {
    var promises = get(this, 'content').getEach('_promise');
    if (!isEmpty(promises)) {
      return RSVP.all(compact(flatten(promises)));
    }
  })),

  /**
   * @property value
   * @type {Ember.ComputedProperty}
   * @private
   */
  value: computed('isAsync', cycleBreaker(function () {
    return get(this, 'isAsync') ? get(this, '_promise') : this;
  })),

  /**
   * Used by the `options` property to create a hash from the `content` that is grouped by validator type.
   * If there is more than 1 of a type, it groups it into an array of option objects.
   *
   * @method  _groupValidatorOptions
   * @return  {Object}
   * @private
   */
  _groupValidatorOptions: function _groupValidatorOptions() {
    var validators = get(this, 'content').getEach('_validator');
    return validators.reduce(function (options, v) {
      if (isNone(v) || isNone(get(v, '_type'))) {
        return options;
      }

      var type = get(v, '_type');
      var vOpts = get(v, 'options');

      if (options[type]) {
        if (isArray(options[type])) {
          options[type].push(vOpts);
        } else {
          options[type] = [options[type], vOpts];
        }
      } else {
        options[type] = vOpts;
      }
      return options;
    }, {});
  }
});