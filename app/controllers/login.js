import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  signupPanelClass: '',

  actions: {
    willTransition(){
      this._super();
      this.set('signupPanelClass', '');
    },

    showSignupPanel() {
      this.set('signupPanelClass', 'show');
    },

    closeMenuPanel() {
      this.set('signupPanelClass', '');
    }
  }
});
