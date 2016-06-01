define('finndis/torii-providers/facebook', ['exports', 'torii/providers/facebook-oauth2'], function (exports, _toriiProvidersFacebookOauth2) {
  exports['default'] = _toriiProvidersFacebookOauth2['default'].extend({
    fetch: function fetch(data) {
      return data;
    }
  });
});