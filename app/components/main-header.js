import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  actions: {

    login () {
      var lockOptions = {authParams:{scope: 'openid'}};
      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
    },
  }
});
