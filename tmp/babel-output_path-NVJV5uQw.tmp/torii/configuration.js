define("torii/configuration", ["exports"], function (exports) {
  "use strict";

  var get = Ember.get;

  var configuration = require("finndis/config/environment")["default"].torii || {};
  configuration.providers = configuration.providers || {};

  function configurable(configKey, defaultValue) {
    return Ember.computed(function configurableComputed() {
      // Trigger super wrapping in Ember 2.1.
      // See: https://github.com/emberjs/ember.js/pull/12359
      this._super = this._super || (function () {
        throw new Error('should always have _super');
      })();
      var namespace = this.get('configNamespace'),
          fullKey = namespace ? [namespace, configKey].join('.') : configKey,
          value = get(configuration, fullKey);
      if (typeof value === 'undefined') {
        if (typeof defaultValue !== 'undefined') {
          if (typeof defaultValue === 'function') {
            return defaultValue.call(this);
          } else {
            return defaultValue;
          }
        } else {
          throw new Error("Expected configuration value " + fullKey + " to be defined!");
        }
      }
      return value;
    });
  }

  exports.configurable = configurable;
  exports["default"] = configuration;
});