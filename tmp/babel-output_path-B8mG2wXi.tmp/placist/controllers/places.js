define('finndis/controllers/places', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),

    userPlaces: _ember['default'].computed(function () {
      return this.get('sessionAccount.user.places');
    }),

    sortProps: ['numericId:desc'],
    sortedPlaces: _ember['default'].computed.sort('userPlaces', 'sortProps'),

    labelsList: _ember['default'].computed(function () {
      var user = this.store.peekRecord('user', this.get('sessionAccount.user.id'));
      return user.get('labels');
    })

  });
});