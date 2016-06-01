import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate: function() {
      let { identification, password } = this.getProperties('identification', 'password');
      return this.get('session').authenticate('authenticator:devise', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    },

    authenticateWithGoogle() {
      this.get('session').authenticate('authenticator:torii2', 'google-oauth2');
      return;
    },

    authenticateWithTwitter() {
      this.get('session').authenticate('authenticator:torii1', 'twitter');
      return;
    }

  }
});
