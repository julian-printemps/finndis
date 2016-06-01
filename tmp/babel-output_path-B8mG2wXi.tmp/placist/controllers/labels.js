define('finndis/controllers/labels', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    labelsList: _ember['default'].computed(function () {
      var user = this.store.peekRecord('user', this.get('sessionAccount.user.id'));
      return user.get('labels');
    })
  });
});