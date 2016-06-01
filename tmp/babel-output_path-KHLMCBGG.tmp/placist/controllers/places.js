define('finndis/controllers/places', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),

    sortProps: ['numericId:desc'],
    sortedPlaces: _ember['default'].computed.sort('model', 'sortProps'),

    labelsList: _ember['default'].computed(function () {
      var user = this.store.peekRecord('user', this.get('session.user.id'));
      return user.get('labels');
    })

  });
});