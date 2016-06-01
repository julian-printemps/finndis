define('finndis/components/menu-panel', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    session: _ember['default'].inject.service('session'),

    userLabels: _ember['default'].computed(function () {
      var labels = this.get('store').peekAll('label');
      return labels;
    }),

    actions: {

      willTransition: function willTransition() {
        this._super();
        this.set('labelPanelClass', '');
      },

      showMenuPanel: function showMenuPanel() {
        this.set('labelPanelClass', 'show');
      },

      closeMenuPanel: function closeMenuPanel() {
        this.set('labelPanelClass', '');
      },

      logout: function logout() {
        this.get('session').invalidate();
      }
    }
  });
});