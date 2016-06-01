define('auth0-ember-simple-auth/authorizers/jwt', ['exports', 'ember', 'ember-simple-auth/authorizers/base'], function (exports, _ember, _emberSimpleAuthAuthorizersBase) {
  'use strict';

  var isEmpty = _ember['default'].isEmpty;

  exports['default'] = _emberSimpleAuthAuthorizersBase['default'].extend({

    authorize: function authorize(sessionData, block) {
      var tokenAttributeName = 'jwt';
      var userToken = sessionData[tokenAttributeName];
      if (!isEmpty(userToken)) {
        block('Authorization', 'Bearer ' + userToken);
      }
    }
  });
});