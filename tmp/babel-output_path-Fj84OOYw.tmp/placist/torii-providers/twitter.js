define('finndis/torii-providers/twitter', ['exports', 'torii/providers/google-oauth2'], function (exports, _toriiProvidersGoogleOauth2) {
  exports['default'] = _toriiProvidersGoogleOauth2['default'].extend({
    fetch: function fetch(data) {
      return data;
    }
  });
});