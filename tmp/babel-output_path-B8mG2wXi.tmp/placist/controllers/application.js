define('finndis/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    actions: {
      transitionToLoginRoute: function transitionToLoginRoute() {
        this.transitionToRoute('login');
      }
    }
  });
});