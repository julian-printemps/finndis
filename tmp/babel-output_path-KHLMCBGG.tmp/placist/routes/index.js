define('finndis/routes/index', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin', 'ic-ajax', 'finndis/config/environment'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin, _icAjax, _finndisConfigEnvironment) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {
    model: function model() {
      var host = _finndisConfigEnvironment['default'].host || '';
    }
  });
});