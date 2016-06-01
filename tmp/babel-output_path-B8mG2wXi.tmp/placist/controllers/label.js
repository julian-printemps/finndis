define('finndis/controllers/label', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    sessionAccount: _ember['default'].inject.service('session-account'),
    labelsController: _ember['default'].inject.controller('labels'),

    labelId: '',

    placesListByLabel: _ember['default'].computed(function () {
      var label = this.store.peekRecord('label', this.get('labelId'));
      return label.get('places');
    })

  });
});