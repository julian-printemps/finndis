define('finndis/authenticators/devise', ['exports', 'ember-simple-auth/authenticators/devise'], function (exports, _emberSimpleAuthAuthenticatorsDevise) {
  exports['default'] = _emberSimpleAuthAuthenticatorsDevise['default'].extend({
    // serverTokenEndpoint: 'http://localhost:3000/users/sign_in'
  });
});