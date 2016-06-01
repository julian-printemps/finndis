define('finndis/routes/edit-labels', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {

    model: function model() {
      var uid = this.get('session.uid');

      return this.store.query('label', { filter: { uid: uid } }).then(function (labels) {
        return labels;
      });
    }

  });
});