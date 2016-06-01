define('finndis/services/session-account', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  var RSVP = _ember['default'].RSVP;
  exports['default'] = _ember['default'].Service.extend({
    session: service(),
    store: service(),

    userPlaces: '',
    sortProps: ['numericId:desc'],
    sortedPlaces: _ember['default'].computed.sort('userPlaces', 'sortProps'),

    loadCurrentUser: function loadCurrentUser() {
      var _this = this;

      return new RSVP.Promise(function (resolve, reject) {
        var userId = _this.get('session.data.authenticated.id');

        if (!_ember['default'].isEmpty(userId)) {
          return _this.get('store').findRecord('user', userId).then(function (user) {
            _this.set('user', user);
            _this.set('userPlaces', user.get('places'));

            resolve();
          }, reject);
        } else {
          resolve();
        }
      });
    }
  });
});