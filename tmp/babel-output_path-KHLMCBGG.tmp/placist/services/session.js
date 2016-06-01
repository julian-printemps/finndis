define('finndis/services/session', ['exports', 'ember', 'ember-simple-auth/services/session'], function (exports, _ember, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'].extend({
    store: _ember['default'].inject.service(),

    setCurrentUser: (function () {
      var self = this;

      if (self.get('isAuthenticated')) {

        var identities = this.get('data.authenticated.profile.identities');
        var uid = identities[0].user_id;

        self.set('uid', uid);

        return this.get('store').query('label', { filter: { uid: uid } }).then(function (labels) {
          self.set('labels', labels);
        });
      }
    }).observes('isAuthenticated')
  });
});