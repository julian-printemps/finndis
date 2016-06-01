import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),

  actions: {

    willTransition(){
      this._super();
      this.set('signupPanelClass', '');
    },

    closeMenuPanel() {
      this.set('signupPanelClass', '');
    },

    signup() {
      var model = this.get('model');
      var firstname = model.get('firstname');
      var lastname = model.get('lastname');
      var password = model.get('password');
      var email = model.get('email');

      var userNew = this.get('store').createRecord('user', {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
      });

      userNew.save();


      // model.validate().then(({
      //     model, validations
      //   }) => {
      //     if (validations.get('isValid')) {
      //       this.setProperties({
      //         showAlert: false,
      //       });
      //       model.save().then(function(user) {
      //         console.log("User saved");
      //       });
      //     } else {
      //       this.set('showAlert', true);
      //     }
      //     this.set('didValidate', true);
      //   }, (errors) => {
      // });

    },

    authenticate: function() {
      let { email, password } = this.getProperties('email', 'password');
      return this.get('session').authenticate('authenticator:devise', email, password).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    }
  }
});
