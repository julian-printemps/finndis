define('finndis/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'finndis/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _finndisConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_finndisConfigEnvironment['default'].APP.name, _finndisConfigEnvironment['default'].APP.version)
  };
});