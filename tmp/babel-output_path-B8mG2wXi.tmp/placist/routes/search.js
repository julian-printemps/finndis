define('finndis/routes/search', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    model: function model() {
      return this.store.findRecord('user', this.get('sessionAccount.user.id'));
    }
  });
});