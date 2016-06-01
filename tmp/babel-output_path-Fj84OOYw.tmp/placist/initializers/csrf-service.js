define('finndis/initializers/csrf-service', ['exports'], function (exports) {
  exports['default'] = {
    name: 'rails-csrf',
    initialize: function initialize(container, app) {
      app.inject('route', 'csrf', 'service:csrf');
      app.inject('controller', 'csrf', 'service:csrf');
    }
  };
});