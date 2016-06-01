define('finndis/adapters/application', ['exports', 'ember-data', 'ember-simple-auth/mixins/data-adapter-mixin', 'finndis/config/environment'], function (exports, _emberData, _emberSimpleAuthMixinsDataAdapterMixin, _finndisConfigEnvironment) {
  exports['default'] = _emberData['default'].JSONAPIAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
    authorizer: 'authorizer:application',
    host: _finndisConfigEnvironment['default'].host,
    coalesceFindRequests: true
  });
});