define('finndis/app', ['exports', 'ember', 'finndis/resolver', 'ember-load-initializers', 'finndis/config/environment'], function (exports, _ember, _finndisResolver, _emberLoadInitializers, _finndisConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _finndisConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _finndisConfigEnvironment['default'].podModulePrefix,
    Resolver: _finndisResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _finndisConfigEnvironment['default'].modulePrefix);

  //Initialize Rails CSRF
  (0, _emberLoadInitializers['default'])(App, 'rails-csrf');

  exports['default'] = App;
});