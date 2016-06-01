define('finndis/authenticators/torii2', ['exports', 'ember', 'ember-simple-auth/authenticators/torii', 'ic-ajax'], function (exports, _ember, _emberSimpleAuthAuthenticatorsTorii, _icAjax) {
  var RSVP = _ember['default'].RSVP;
  exports['default'] = _emberSimpleAuthAuthenticatorsTorii['default'].extend({
    torii: _ember['default'].inject.service(),

    authenticate: function authenticate() {
      var _this = this,
          _arguments = arguments;

      return new RSVP.Promise(function (resolve, reject) {
        _this._super.apply(_this, _arguments).then(function (data) {

          (0, _icAjax['default'])({
            url: 'http://localhost:4200/users/auth/google_oauth2/callback',
            type: 'POST',
            dataType: 'json',
            data: { 'code': data.authorizationCode }
          }).then(function (response) {
            resolve({
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              access_token: response.access_token,
              // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
              provider: response.provider
            });
          }, reject);
        }, reject);
      });
    }
  });
});