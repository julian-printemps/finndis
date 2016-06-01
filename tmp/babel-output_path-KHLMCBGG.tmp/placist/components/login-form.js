define('finndis/components/login-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),

    actions: {
      authenticate: function authenticate() {
        var _this = this;

        var _getProperties = this.getProperties('identification', 'password');

        var identification = _getProperties.identification;
        var password = _getProperties.password;

        return this.get('session').authenticate('authenticator:devise', identification, password)['catch'](function (reason) {
          _this.set('errorMessage', reason.error);
        });
      },

      authenticateWithGoogle: function authenticateWithGoogle() {
        this.get('session').authenticate('authenticator:torii2', 'google-oauth2');
        return;
      },

      authenticateWithTwitter: function authenticateWithTwitter() {
        this.get('session').authenticate('authenticator:torii1', 'twitter');
        return;
      }

    }
  });
});