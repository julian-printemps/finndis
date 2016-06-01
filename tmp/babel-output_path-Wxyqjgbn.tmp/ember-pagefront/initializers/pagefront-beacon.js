define('ember-pagefront/initializers/pagefront-beacon', ['exports'], function (exports) {
  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    application.inject('service:pagefront-beacon', 'target', 'route:application');
  }

  exports['default'] = {
    name: 'pagefront-beacon',
    initialize: initialize
  };
});