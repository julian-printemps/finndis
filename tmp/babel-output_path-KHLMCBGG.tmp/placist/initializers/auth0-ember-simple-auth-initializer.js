define('finndis/initializers/auth0-ember-simple-auth-initializer', ['exports', 'auth0-ember-simple-auth/authenticators/lock', 'auth0-ember-simple-auth/authorizers/jwt'], function (exports, _auth0EmberSimpleAuthAuthenticatorsLock, _auth0EmberSimpleAuthAuthorizersJwt) {
  exports['default'] = {
    name: 'auth0-ember-simple-auth-initializer',
    before: 'ember-simple-auth',
    initialize: function initialize(registry) {
      registry.register('simple-auth-authenticator:lock', _auth0EmberSimpleAuthAuthenticatorsLock['default']);
      registry.register('simple-auth-authorizer:jwt', _auth0EmberSimpleAuthAuthorizersJwt['default']);
    }
  };
});