define('finndis/tests/helpers/resolver', ['exports', 'finndis/resolver', 'finndis/config/environment'], function (exports, _finndisResolver, _finndisConfigEnvironment) {

  var resolver = _finndisResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _finndisConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _finndisConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});