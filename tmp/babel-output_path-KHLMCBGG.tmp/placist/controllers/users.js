define('finndis/controllers/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    currentUser: _ember['default'].computed(function () {
      return this.get('session.user.id');
    })

  });
});