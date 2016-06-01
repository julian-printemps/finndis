define('ember-cli-foundation-6-sass/initializers/zf-widget', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.initialize = initialize;

  function initialize() /* application */{
    // application.inject('route', 'foo', 'service:foo');
    if (_ember['default'].typeOf(_ember['default'].$().foundation) === 'function') {
      _ember['default'].$().foundation();
    }
  }

  exports['default'] = {
    name: 'zf-widget',
    initialize: initialize
  };
});