define('finndis/components/signup-form', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),

    actions: {

      willTransition: function willTransition() {
        this._super();
        this.set('signupPanelClass', '');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('signupPanelClass', '');
      },

      signup: function signup() {
        var self = this;
        var model = this.get('model');
        var firstname = model.get('firstname');
        var lastname = model.get('lastname');
        var password = model.get('password');
        var email = model.get('email');

        var newUser = this.get('store').createRecord('user', {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
        });

        newUser.save();

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

      authenticate: function authenticate() {
        var _this = this;

        var _getProperties = this.getProperties('email', 'password');

        var email = _getProperties.email;
        var password = _getProperties.password;

        return this.get('session').authenticate('authenticator:devise', email, password)['catch'](function (reason) {
          _this.set('errorMessage', reason.error);
        });
      }
    }
  });
});