
export default buildValidations;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import flatten from '../utils/flatten';
import assign from '../utils/assign';
import ValidationResult from './result';
import ValidationResultCollection from './result-collection';
import BaseValidator from '../validators/base';
import cycleBreaker from '../utils/cycle-breaker';

var get = Ember.get;
var set = Ember.set;
var run = Ember.run;
var RSVP = Ember.RSVP;
var merge = Ember.merge;
var isNone = Ember.isNone;
var guidFor = Ember.guidFor;
var isEmpty = Ember.isEmpty;
var isArray = Ember.isArray;
var computed = Ember.computed;
var makeArray = Ember.makeArray;
var canInvoke = Ember.canInvoke;
var getWithDefault = Ember.getWithDefault;
var emberArray = Ember.A;
var Promise = RSVP.Promise;
var and = computed.and;
var or = computed.or;
var not = computed.not;

/**
 * ## Running Manual Validations
 *
 * Although validations are lazily computed, there are times where we might want to force all or
 * specific validations to happen. For this reason we have exposed two methods:
 * - {{#crossLink "Factory/validateSync:method"}}{{/crossLink}}: Should only be used if all validations are synchronous. It will throw an error if any of the validations are asynchronous
 * - {{#crossLink "Factory/validate:method"}}{{/crossLink}}: Will always return a promise and should be used if asynchronous validations are present
 *
 * ## Inspecting Validations
 *
 * All validations can be accessed via the `validations` object created on your model/object.
 * Each attribute also has its own validation which has the same properties.
 * An attribute validation can be accessed via `validations.attrs.<ATTRIBUTE>` which will return a {{#crossLink "ResultCollection"}}{{/crossLink}}.
 *
 * ### Global Validations
 *
 * Global validations exist on the `validations` object that resides on the object that is being validated.
 * To see all possible properties, please checkout the docs for {{#crossLink "ResultCollection"}}{{/crossLink}}.
 *
 * ```js
 * model.get('validations.isValid');
 * model.get('validations.errors');
 * model.get('validations.messages');
 * // etc...
 * ```
 *
 * ### Attribute Validations
 *
 * The `validations` object also contains an `attrs` object which holds a {{#crossLink "ResultCollection"}}{{/crossLink}}
 * for each attribute specified in your validation rules.
 *
 * ```js
 * model.get('validations.attrs.username.isValid');
 * model.get('validations.attrs.password.errors');
 * model.get('validations.attrs.email.messages');
 * // etc...
 * ```
 *
 * @module Validations
 * @main Validations
 * @class Factory
 */

/**
 * Temporary fix until setOwner polyfill is created
 * https://github.com/rwjblue/ember-getowner-polyfill/issues/1
 */
function setOwner(obj, model) {
  obj = obj || {};
  if (Ember.setOwner) {
    Ember.setOwner(obj, getOwner(model));
  } else {
    obj.container = get(model, 'container');
  }
}

/**
 * Top level method that will ultimately return a mixin with all CP validations
 * @method  buildValidations
 * @param  {Object} validations  Validation rules
 * @return {Ember.Mixin}
 */
function buildValidations() {
  var validations = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  processDefaultOptions(validations);

  var Validations = undefined;

  return Ember.Mixin.create({
    _validationsClass: computed(function () {
      if (!Validations) {
        Validations = createValidationsClass(this._super(), validations);
      }
      return Validations;
    }).readOnly(),
    validations: computed(function () {
      return this.get('_validationsClass').create({ model: this });
    }).readOnly(),
    validate: function validate() {
      var _get;

      return (_get = get(this, 'validations')).validate.apply(_get, arguments);
    },
    validateSync: function validateSync() {
      var _get2;

      return (_get2 = get(this, 'validations')).validateSync.apply(_get2, arguments);
    },
    destroy: function destroy() {
      this._super.apply(this, arguments);
      get(this, 'validations').destroy();
    }
  });
}

/**
 * Validation rules can be created with default options
 * {
 *   description: 'Username',
 *   validators: [...]
 * }
 * This method generate the default options pojo, applies it to each validation rule, and flattens the object
 * @method processDefaultOptions
 * @private
 * @param  {Object} validations
 * @return
 */
function processDefaultOptions() {
  var validations = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var validatableAttrs = Object.keys(validations);

  validatableAttrs.forEach(function (attribute) {
    var rules = validations[attribute];
    if (rules && typeof rules === 'object' && isArray(rules.validators)) {
      (function () {
        var options = Object.keys(rules).reduce(function (o, k) {
          if (k !== 'validators') {
            o[k] = rules[k];
          }
          return o;
        }, {});
        var validators = rules.validators;
        validators.forEach(function (v) {
          return v.defaultOptions = options;
        });
        validations[attribute] = validators;
      })();
    }
  });
}

/**
 * Creates the validations class that will become `model.validations`.
 *   - Setup parent validation inheritance
 *   - Normalize nested keys (i.e. 'details.dob') into objects (i.e { details: { dob: validator() }})
 *   - Merge normalized validations with parent
 *   - Create `attrs` object with CPs
 *   - Create global CPs (i.e. 'isValid', 'messages', etc...)
 *
 * @method createValidationsClass
 * @private
 * @param  {Object} inheritedValidationsClass
 * @param  {Object} validations
 * @return {Ember.Object}
 */
function createValidationsClass(inheritedValidationsClass) {
  var validations = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var validationRules = {};
  var validatableAttributes = Object.keys(validations);

  // Setup validation inheritance
  if (inheritedValidationsClass) {
    var inheritedValidations = inheritedValidationsClass.create();
    validationRules = merge(validationRules, inheritedValidations.get('_validationRules'));
    validatableAttributes = emberArray(inheritedValidations.get('validatableAttributes').concat(validatableAttributes)).uniq();
  }

  // Normalize nested keys into actual objects and merge them with parent object
  Object.keys(validations).reduce(function (obj, key) {
    assign(obj, key, validations[key]);
    return obj;
  }, validationRules);

  // Create the CPs that will be a part of the `attrs` object
  var attrCPs = validatableAttributes.reduce(function (obj, attribute) {
    assign(obj, attribute, createCPValidationFor(attribute, validationRules[attribute]), true);
    return obj;
  }, {});

  // Create the mixin that holds all the top level validation props (isValid, messages, etc)
  var TopLevelProps = createTopLevelPropsMixin(validatableAttributes);

  // Create the `attrs` class which will add the current model reference once instantiated
  var Attrs = Ember.Object.extend(attrCPs, {
    init: function init() {
      var _this = this;

      this._super.apply(this, arguments);
      var model = this.get('_model');

      validatableAttributes.forEach(function (attribute) {
        // Add a reference to the model in the deepest object
        var path = attribute.split('.');
        var lastObject = get(_this, path.slice(0, path.length - 1).join('.'));
        if (isNone(get(lastObject, '_model'))) {
          set(lastObject, '_model', model);
        }
      });
    }
  });

  // Create `validations` class
  return Ember.Object.extend(TopLevelProps, {
    model: null,
    attrs: null,
    isValidations: true,

    validatableAttributes: computed(function () {
      return validatableAttributes;
    }).readOnly(),

    // Caches
    _validators: null,
    _debouncedValidations: null,

    // Private
    _validationRules: computed(function () {
      return validationRules;
    }).readOnly(),

    validate: validate,
    validateSync: validateSync,

    init: function init() {
      this._super.apply(this, arguments);
      this.setProperties({
        attrs: Attrs.create({ _model: this.get('model') }),
        _validators: {},
        _debouncedValidations: {}
      });
    },

    destroy: function destroy() {
      this._super.apply(this, arguments);
      var validatableAttrs = get(this, 'validatableAttributes');
      var debouncedValidations = get(this, '_debouncedValidations');

      // Cancel all debounced timers
      validatableAttrs.forEach(function (attr) {
        var attrCache = get(debouncedValidations, attr);
        if (!isNone(attrCache)) {
          // Itterate over each attribute and cancel all of its debounced validations
          Object.keys(attrCache).forEach(function (v) {
            return run.cancel(attrCache[v]);
          });
        }
      });
    }
  });
}

/**
 * CP generator for the given attribute
 * @method createCPValidationFor
 * @private
 * @param  {String} attribute
 * @param  {Array / Object} validations
 * @return {Ember.computed} A computed property which is a ValidationResultCollection
 */
function createCPValidationFor(attribute, validations) {
  var dependentKeys = getCPDependentKeysFor(attribute, validations);
  return computed.apply(undefined, _toConsumableArray(dependentKeys).concat([cycleBreaker(function () {
    var model = get(this, '_model');
    var validators = getValidatorsFor(attribute, model);

    var validationResults = validators.map(function (validator) {
      var options = validator.processOptions();
      var debounce = getWithDefault(options, 'debounce', 0);
      var disabled = getWithDefault(options, 'disabled', false);
      var value = undefined;

      if (disabled) {
        value = true;
      } else if (debounce > 0) {
        (function () {
          var cache = getDebouncedValidationsCacheFor(attribute, model);
          // Return a promise and pass the resolve method to the debounce handler
          value = new Promise(function (resolve) {
            cache[guidFor(validator)] = run.debounce(validator, debouncedValidate, validator, model, attribute, resolve, debounce, false);
          });
        })();
      } else {
        value = validator.validate(get(model, attribute), options, model, attribute);
      }

      return validationReturnValueHandler(attribute, value, model, validator);
    });

    return ValidationResultCollection.create({
      attribute: attribute, content: flatten(validationResults)
    });
  })])).readOnly();
}

/**
 * Create a mixin that will have all the top level CPs under the validations object.
 * These are computed collections on different properties of each attribute validations CP
 *
 * @method createTopLevelPropsMixin
 * @private
 * @param  {Object} validations
 */
function createTopLevelPropsMixin(validatableAttrs) {
  return Ember.Mixin.create({
    isValid: and.apply(undefined, _toConsumableArray(validatableAttrs.map(function (attr) {
      return 'attrs.' + attr + '.isValid';
    }))).readOnly(),
    isValidating: or.apply(undefined, _toConsumableArray(validatableAttrs.map(function (attr) {
      return 'attrs.' + attr + '.isValidating';
    }))).readOnly(),
    isDirty: or.apply(undefined, _toConsumableArray(validatableAttrs.map(function (attr) {
      return 'attrs.' + attr + '.isDirty';
    }))).readOnly(),
    isAsync: or.apply(undefined, _toConsumableArray(validatableAttrs.map(function (attr) {
      return 'attrs.' + attr + '.isAsync';
    }))).readOnly(),
    isNotValidating: not('isValidating').readOnly(),
    isInvalid: not('isValid').readOnly(),
    isTruelyValid: and('isValid', 'isNotValidating').readOnly(),

    messages: computed.apply(undefined, _toConsumableArray(validatableAttrs.map(function (attr) {
      return 'attrs.' + attr + '.messages';
    })).concat([function () {
      var _this2 = this;

      return emberArray(flatten(validatableAttrs.map(function (attr) {
        return get(_this2, 'attrs.' + attr + '.messages');
      }))).compact();
    }])).readOnly(),

    message: computed('messages.[]', cycleBreaker(function () {
      return get(this, 'messages.0');
    })).readOnly(),

    errors: computed.apply(undefined, _toConsumableArray(validatableAttrs.map(function (attr) {
      return 'attrs.' + attr + '.@each.errors';
    })).concat([function () {
      var _this3 = this;

      return emberArray(flatten(validatableAttrs.map(function (attr) {
        return get(_this3, 'attrs.' + attr + '.errors');
      }))).compact();
    }])).readOnly(),

    error: computed('errors.[]', cycleBreaker(function () {
      return get(this, 'errors.0');
    })).readOnly(),

    _promise: computed.apply(undefined, _toConsumableArray(validatableAttrs.map(function (attr) {
      return 'attrs.' + attr + '._promise';
    })).concat([function () {
      var _this4 = this;

      var promises = [];
      validatableAttrs.forEach(function (attr) {
        var validation = get(_this4, 'attrs.' + attr);
        if (get(validation, 'isAsync')) {
          promises.push(get(validation, '_promise'));
        }
      });
      return RSVP.Promise.all(flatten(promises));
    }])).readOnly()
  });
}

/**
 * CP dependency generator for a give attribute depending on its relationships
 * @method getCPDependentKeysFor
 * @private
 * @param  {String} attribute
 * @param  {Array / Object} validations
 * @return {Array} Unique list of dependencies
 */
function getCPDependentKeysFor(attribute, validations) {
  var dependentKeys = emberArray();
  validations = makeArray(validations);

  dependentKeys.push('_model.' + attribute);

  validations.forEach(function (validation) {
    var type = validation._type;
    var options = validation.options;

    if (type === 'belongs-to') {
      dependentKeys.push(attribute + '.isTruelyValid');
    } else if (type === 'has-many') {
      dependentKeys.push(attribute + '.@each.isTruelyValid');
    } else if (type === 'ds-error') {
      dependentKeys.push('_model.errors.' + attribute + '.[]');
    } else if (type === 'confirmation' && validation.options.on) {
      dependentKeys.push('_model.' + validation.options.on);
    } else if (type === 'dependent') {
      var dependents = get(validation, 'options.on');
      if (!isEmpty(dependents)) {
        dependents.forEach(function (dependent) {
          return dependentKeys.push(dependent + '.isTruelyValid');
        });
      }
    } else if (type === 'collection' && (options === true || options.collection === true)) {
      dependentKeys.push('_model.' + attribute + '.[]');
    }

    var specifiedDependents = [].concat(getWithDefault(options, 'dependentKeys', []), getWithDefault(validation, 'defaultOptions.dependentKeys', []));
    specifiedDependents.forEach(function (d) {
      dependentKeys.push('_model.' + d);
    });
  });

  return dependentKeys.uniq();
}

/**
 * Debounce handler for running a validation for the specified options
 * @method debouncedValidate
 * @private
 * @param  {Validator} validator
 * @param  {Unknown} value
 * @param  {Object} options
 * @param  {Object} model
 * @param  {String} attribute
 * @param  {Function} resolve
 */
function debouncedValidate(validator, model, attribute, resolve) {
  resolve(validator.validate(get(model, attribute), validator.processOptions(), model, attribute));
}

/**
 * A handler used to create ValidationResult object from values returned from a validator
 * @method validationReturnValueHandler
 * @private
 * @param  {String} attribute
 * @param  {Unknown} value
 * @param  {Object} model
 * @return {ValidationResult}
 */
function validationReturnValueHandler(attribute, value, model, validator) {
  var result, _promise;

  if (canInvoke(value, 'then')) {
    _promise = Promise.resolve(value);
    result = ValidationResult.create({
      attribute: attribute, _promise: _promise, model: model,
      _validator: validator
    });
  } else {
    result = ValidationResult.create({
      attribute: attribute, model: model,
      _validator: validator
    });
    result.update(value);
  }

  return result;
}

/**
 * Get validators for the give attribute. If they are not in the cache, then create them.
 * @method getValidatorsFor
 * @private
 * @param  {String} attribute
 * @param  {Object} model
 * @return {Array}
 */
function getValidatorsFor(attribute, model) {
  var validators = get(model, 'validations._validators.' + attribute);

  if (!isNone(validators)) {
    return validators;
  }

  return createValidatorsFor(attribute, model);
}

/**
 * Get debounced validation cache for the given attribute. If it doesnt exist, create a new one.
 * @method getValidatorCacheFor
 * @private
 * @param  {String} attribute
 * @param  {Object} model
 * @return {Map}
 */
function getDebouncedValidationsCacheFor(attribute, model) {
  var debouncedValidations = get(model, 'validations._debouncedValidations');

  if (isNone(get(debouncedValidations, attribute))) {
    assign(debouncedValidations, attribute, {});
  }

  return get(debouncedValidations, attribute);
}

/**
 * Create validators for the give attribute and store them in a cache
 * @method createValidatorsFor
 * @private
 * @param  {String} attribute
 * @param  {Object} model
 * @return {Array}
 */
function createValidatorsFor(attribute, model) {
  var validations = get(model, 'validations');
  var validationRules = makeArray(get(validations, '_validationRules.' + attribute));
  var validatorCache = get(validations, '_validators');
  var owner = getOwner(model);
  var validators = [];
  var validator;

  // We must have an owner to be able to lookup our validators
  if (isNone(owner)) {
    throw new TypeError('[ember-cp-validations] ' + model.toString() + ' is missing a container or owner.');
  }

  validationRules.forEach(function (v) {
    v.attribute = attribute;
    v.model = model;

    // If validate function exists, that means validator was created with a function so use the base class
    if (v._type === 'function') {
      validator = BaseValidator;
      setOwner(v, model);
    } else {
      validator = lookupValidator(owner, v._type);
    }
    validators.push(validator.create(v));
  });

  // Add validators to model instance cache
  assign(validatorCache, attribute, validators);

  return validators;
}

/**
 * Lookup a validators of a specific type on the owner
 * @method lookupValidator
 * @throws {Error} Validator not found
 * @private
 * @param  {Ember.Owner} owner
 * @param  {String} type
 * @return {Class} Validator class or undefined if not found
 */
function lookupValidator(owner, type) {
  var validatorClass = owner._lookupFactory('validator:' + type);
  if (isNone(validatorClass)) {
    throw new Error('[ember-cp-validations] Validator not found of type: ' + type + '.');
  }
  return validatorClass;
}

/**
 * ### Options
 * - `on` (**Array**): Only validate the given attributes. If empty, will validate over all validatable attribute
 * - `excludes` (**Array**): Exclude validation on the given attributes
 *
 * ```javascript
 * model.validate({ on: ['username', 'email'] }).then(({ m, validations }) => {
 *   validations.get('isValid'); // true or false
 *   validations.get('isValidating'); // false
 *
 *   let usernameValidations = m.get('validations.attrs.username');
 *   usernameValidations.get('isValid') // true or false
 * });
 * ```
 *
 * @method validate
 * @param  {Object}  options
 * @param  {Boolean} async      If `false`, will get all validations and will error if an async validations is found.
 *                              If `true`, will get all validations and wrap them in a promise hash
 * @return {Promise or Object}  Promise if async is true, object if async is false
 */
function validate() {
  var _this5 = this;

  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var async = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  var model = get(this, 'model');
  var whiteList = makeArray(options.on);
  var blackList = makeArray(options.excludes);
  var validationResult, value;

  var validationResults = get(this, 'validatableAttributes').reduce(function (v, name) {
    if (!isEmpty(blackList) && blackList.indexOf(name) !== -1) {
      return v;
    }

    if (isEmpty(whiteList) || whiteList.indexOf(name) !== -1) {
      validationResult = get(_this5, 'attrs.' + name);

      // If an async validation is found, throw an error
      if (!async && get(validationResult, 'isAsync')) {
        throw new Error('[ember-cp-validations] Synchronous validation failed due to ' + name + ' being an async validation.');
      }

      value = get(validationResult, 'value');
      v.push(validationResult);
    }
    return v;
  }, []);

  var validationResultsCollection = ValidationResultCollection.create({
    content: validationResults
  });

  var resultObject = {
    model: model,
    validations: validationResultsCollection
  };

  if (async) {
    if (get(validationResultsCollection, 'isAsync')) {
      resultObject.promise = get(validationResultsCollection, 'value');
    }
    return RSVP.hash(resultObject);
  }

  return resultObject;
}

/**
 * ### Options
 * - `on` (**Array**): Only validate the given attributes. If empty, will validate over all validatable attribute
 * - `excludes` (**Array**): Exclude validation on the given attributes
 *
 * ```javascript
 * const { m, validations } = model.validateSync();
 * validations.get('isValid') // true or false
 * ```
 * @method validateSync
 * @param  {Object}  options
 * @return {Object}
 */
function validateSync(options) {
  return this.validate(options, false);
}