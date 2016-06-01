import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';
var isEmpty = Ember.isEmpty;

export default BaseAuthorizer.extend({

  authorize: function authorize(sessionData, block) {
    var tokenAttributeName = 'jwt';
    var userToken = sessionData[tokenAttributeName];
    if (!isEmpty(userToken)) {
      block('Authorization', 'Bearer ' + userToken);
    }
  }
});