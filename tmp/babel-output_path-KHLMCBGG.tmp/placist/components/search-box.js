define('finndis/components/search-box', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),

    resultSearch: '',

    actions: {

      search: function search() {
        var self = this;
        var uid = this.get('session.uid');
        var keyword = this.get('search');

        this.get('store').query('place', { filter: { uid: uid, keyword: keyword } }).then(function (places) {
          self.set('resultSearch', places);
        });
      }
    }
  });
});