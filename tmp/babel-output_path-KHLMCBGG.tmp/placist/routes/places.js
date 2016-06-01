define('finndis/routes/places', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    session: _ember['default'].inject.service('session'),

    model: function model() {
      var uid = this.get('session.uid');

      return this.store.query('place', { filter: { uid: uid } }).then(function (places) {
        return places;
      });
    }
  });
});