define('finndis/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {

    actions: {
      login: function login() {
        var lockOptions = { authParams: { scope: 'openid' } };
        this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
      },

      logout: function logout() {
        this.get('session').invalidate();
      }
    }
  });
});