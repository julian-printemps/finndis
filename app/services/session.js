import Ember from 'ember';
import ESASession from "ember-simple-auth/services/session";

export default ESASession.extend({
  store: Ember.inject.service(),

  setCurrentUser: function() {
    var self = this;

    if (self.get('isAuthenticated')) {

      var identities = this.get('data.authenticated.profile.identities');
      var uid = identities[0].user_id;

      self.set('uid', uid);

      return this.get('store').query('label', { filter: { uid: uid } }).then(function(labels) {
        if( labels.get("length") === 0 ){
          var label = self.get('store').createRecord('label', {
            name: 'Bar',
            uid: uid
          });
          label.save();
        }
        else {
          self.set('labels', labels);
        }
      });


    }
  }.observes('isAuthenticated'),
});
