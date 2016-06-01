define('finndis/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    signupPanelClass: '',

    actions: {
      willTransition: function willTransition() {
        this._super();
        this.set('signupPanelClass', '');
      },

      showSignupPanel: function showSignupPanel() {
        this.set('signupPanelClass', 'show');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('signupPanelClass', '');
      }
    }
  });
});