define('finndis/controllers/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    currentUser: _ember['default'].computed(function () {
      return this.get('sessionAccount.user.id');
    })

  });
});