define('ember-pagefront/instance-initializers/pagefront-beacon', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.initialize = initialize;

  var FUNCTION = 'function';
  var ACTION = 'pagefrontDidRelease';

  function isFunction(object) {
    return _ember['default'].typeOf(object) === FUNCTION;
  }

  function lookup(applicationInstance, name) {
    if (isFunction(applicationInstance.lookup)) {
      return applicationInstance.lookup(name);
    } else {
      return applicationInstance.container.lookup(name);
    }
  }

  function hasAction(route) {
    var actions = route.actions || route._actions;

    return actions && isFunction(actions[ACTION]);
  }

  function isEnabled(applicationInstance) {
    var route = lookup(applicationInstance, 'route:application');

    return route && hasAction(route);
  }

  function initialize(applicationInstance) {
    if (isEnabled(applicationInstance)) {
      lookup(applicationInstance, 'service:pagefront-beacon');
    }
  }

  exports['default'] = {
    name: 'pagefront-beacon',
    initialize: initialize
  };
});